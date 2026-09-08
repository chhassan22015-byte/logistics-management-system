import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api'; // API service import ki

export default function CreateShipment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    trackingId: 'TRK-' + Math.floor(100000 + Math.random() * 900000),
    sender: '',
    receiver: '',
    destination: '',
    weight: '',
    status: 'In Transit'
  });
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
      // Backend par shipment create karne ki request bhejna
      await API.post('/shipments', formData);
      alert("Shipment created and saved to database successfully!");
      navigate('/shipments'); // All Shipments page par redirect kar do
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create shipment. Please make sure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-400">Create New Shipment</h2>
          <Link to="/dashboard" className="text-slate-400 hover:text-white text-sm">Back to Dashboard</Link>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Tracking ID (Auto)</label>
            <input 
              type="text" 
              name="trackingId"
              value={formData.trackingId}
              disabled
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-400 cursor-not-allowed text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Sender Name</label>
              <input 
                type="text" 
                name="sender"
                value={formData.sender}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
                placeholder="Sender's full name"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Receiver Name</label>
              <input 
                type="text" 
                name="receiver"
                value={formData.receiver}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
                placeholder="Receiver's full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Destination Address</label>
            <input 
              type="text" 
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Delivery address / City"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Weight</label>
              <input 
                type="text" 
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
                placeholder="e.g. 2.5 kg"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Initial Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
              >
                <option value="In Transit">In Transit</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-500/30 mt-4 text-sm disabled:opacity-50"
          >
            {loading ? 'Saving to Database...' : 'Save & Publish Shipment'}
          </button>
        </form>
      </div>
    </div>
  );
}