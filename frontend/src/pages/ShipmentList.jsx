import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function ShipmentList() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Local storage se user ka role check karna (Admin check)
  const userRole = localStorage.getItem('role');

  const fetchShipments = async () => {
    try {
      const response = await API.get('/shipments');
      setShipments(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch shipments from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  // Status update function (Sirf Admin ke liye)
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Authorization token automatically API service attach kar degi agar set hai
      const token = localStorage.getItem('token');
      await API.put(`/shipments/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert('Shipment status updated successfully!');
      // List dobara fetch karein taake UI refresh ho jaye
      fetchShipments();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col p-6">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto w-full">
        <div>
          <h2 className="text-2xl font-bold text-blue-400">All Shipments</h2>
          <p className="text-slate-400 text-sm">Monitor and manage all active delivery orders from database.</p>
        </div>
        <div className="space-x-4">
          <Link to="/dashboard" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg text-sm transition-colors">
            Dashboard
          </Link>
          <Link to="/create-shipment" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm transition-colors shadow-lg shadow-blue-500/30">
            + Add New
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto w-full mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl text-center">
          {error}
        </div>
      )}

      {/* Table Container */}
      <div className="max-w-7xl mx-auto w-full bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-850 border-b border-slate-700 text-slate-400 text-sm">
                <th className="p-4">Tracking ID</th>
                <th className="p-4">Sender</th>
                <th className="p-4">Receiver</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Weight</th>
                <th className="p-4">Status</th>
                {userRole === 'admin' && <th className="p-4">Actions (Admin)</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={userRole === 'admin' ? "7" : "6"} className="p-8 text-center text-slate-400">
                    Loading shipments from database...
                  </td>
                </tr>
              ) : shipments.length === 0 ? (
                <tr>
                  <td colSpan={userRole === 'admin' ? "7" : "6"} className="p-8 text-center text-slate-400">
                    No shipments found. Create your first shipment!
                  </td>
                </tr>
              ) : (
                shipments.map((item) => (
                  <tr key={item.id || item._id} className="hover:bg-slate-750 transition-colors">
                    <td className="p-4 font-mono text-blue-400">{item.trackingId}</td>
                    <td className="p-4">{item.sender}</td>
                    <td className="p-4">{item.receiver}</td>
                    <td className="p-4 text-slate-300">{item.destination}</td>
                    <td className="p-4 text-slate-300">{item.weight}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        item.status === 'In-Transit' || item.status === 'Out for Delivery' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    
                    {/* Admin Status Update Dropdown */}
                    {userRole === 'admin' && (
                      <td className="p-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id || item._id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                        >
                          <option value="Processing">Processing</option>
                          <option value="In-Transit">In-Transit</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}