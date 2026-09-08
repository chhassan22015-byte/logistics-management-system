import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, delivered: 0, processing: 0, transit: 0 });
  const [userName, setUserName] = useState('');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || 'User');
    
    const fetchDashboardData = async () => {
      try {
        const response = await API.get('/shipments');
        const data = response.data;
        
        const total = data.length;
        const delivered = data.filter(s => s.status === 'Delivered').length;
        const processing = data.filter(s => s.status === 'Processing').length;
        const transit = data.filter(s => s.status === 'In Transit' || s.status === 'Out for Delivery').length;

        setStats({ total, delivered, processing, transit });
      } catch (err) {
        console.error('Dashboard data fetch error');
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Chart data array
  const chartData = [
    { name: 'Processing', count: stats.processing },
    { name: 'In Transit', count: stats.transit },
    { name: 'Delivered', count: stats.delivered },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col p-6">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto w-full bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">Welcome, {userName}!</h1>
          <p className="text-slate-400 text-sm capitalize">Role: <span className="text-emerald-400 font-semibold">{userRole || 'Sender'}</span></p>
        </div>
        <div className="space-x-3">
          <Link to="/shipments" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm transition-colors shadow-lg shadow-blue-500/30">
            View All Shipments
          </Link>
          <button onClick={handleLogout} className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl">
          <p className="text-slate-400 text-sm">Total Shipments</p>
          <h3 className="text-3xl font-bold text-blue-400 mt-2">{stats.total}</h3>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl">
          <p className="text-slate-400 text-sm">Processing</p>
          <h3 className="text-3xl font-bold text-amber-400 mt-2">{stats.processing}</h3>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl">
          <p className="text-slate-400 text-sm">In Transit</p>
          <h3 className="text-3xl font-bold text-purple-400 mt-2">{stats.transit}</h3>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl">
          <p className="text-slate-400 text-sm">Delivered</p>
          <h3 className="text-3xl font-bold text-emerald-400 mt-2">{stats.delivered}</h3>
        </div>
      </div>

      {/* Visual Chart Section */}
      <div className="max-w-7xl mx-auto w-full bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl">
        <h3 className="text-lg font-bold text-blue-400 mb-6">Shipment Status Analytics</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}