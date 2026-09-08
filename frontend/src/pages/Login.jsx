import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();
  
  // State toggle karne ke liye (Login ya Create Account)
  const [isLoginMode, setIsLoginMode] = useState(true); 
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'sender' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLoginMode ? '/auth/login' : '/auth/register';
      const response = await API.post(endpoint, formData);
      
      if (isLoginMode) {
        // Token aur User ka data localStorage mein save karna
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role || response.data.user?.role); 
        localStorage.setItem('userName', response.data.name || response.data.user?.name); 
        
        alert('Login successful!');
        navigate('/dashboard'); 
      } else {
        // Agar naya account banaya hai, toh login mode par switch karein
        alert('Account created successfully! Please sign in with your authentic email.');
        setIsLoginMode(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        console.log("Google Token:", tokenResponse.access_token);
        
        // Asal project mein aap yeh token backend ko bhej kar apna JWT token wapas lenge:
        // const res = await API.post('/auth/google', { token: tokenResponse.access_token });
        // localStorage.setItem('token', res.data.token);
        
        alert("Google Sign-In Successful!");
        navigate('/dashboard');
      } catch (err) {
        setError("Google Sign-In failed on server.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Google Sign-In Failed.'),
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 w-full max-w-md my-8">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-400">
            {isLoginMode ? 'Login to Logistics' : 'Create an Account'}
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            {isLoginMode ? 'Sign in to access your portal' : 'Join us to manage your shipments securely'}
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Naya Account banate waqt Name field show hogi */}
          {!isLoginMode && (
            <div>
              <label className="block text-sm text-slate-300 mb-1">First Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLoginMode}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
                placeholder="Ali Khan"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-300 mb-1">Authentic Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
              placeholder="name@real-email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-500/30 mt-2 text-sm disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Google Sign-In Section */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-slate-800 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button 
              onClick={() => loginWithGoogle()}
              type="button"
              className="w-full flex items-center justify-center px-4 py-2.5 border border-slate-700 rounded-lg bg-slate-900 text-sm font-medium text-slate-300 hover:bg-slate-750 transition-colors"
            >
              <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              Sign in with Google
            </button>
          </div>
        </div>

        {/* Toggle Login/Register Mode */}
        <p className="text-center text-sm text-slate-400 mt-6">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)} 
            className="text-blue-400 hover:underline font-medium"
          >
            {isLoginMode ? "Register" : "Sign in instead"}
          </button>
        </p>

      </div>
    </div>
  );
}