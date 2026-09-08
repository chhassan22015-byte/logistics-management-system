import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import MapComponent from '../components/MapComponent';

export default function TrackShipment() {
  const [trackingId, setTrackingId] = useState('');
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setError('');
    setShipment(null);
    setLoading(true);

    try {
      // Backend ke public route se data fetch kar raha hai
      const response = await API.get(`/shipments/track/${trackingId.trim()}`);
      
      // Data milne par set kar diya
      setShipment(response.data);

    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Is Tracking ID ki koi shipment nahi mili. Dobara check karein.');
      } else {
        setError('Tracking data fetch karne mein masla aaya.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 w-full max-w-lg">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-400">Track Your Shipment</h2>
          <Link to="/login" className="text-sm text-slate-400 hover:text-white">Login to Dashboard</Link>
        </div>

        <form onSubmit={handleTrack} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Enter Tracking ID</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                required
                placeholder="e.g. TRK-100234"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm font-mono"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Track'}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        {shipment && (
          <div className="space-y-4">
            {/* Shipment Details Box */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 space-y-3">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-sm">Tracking ID:</span>
                <span className="font-mono text-blue-400 font-bold">{shipment.trackingId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-sm">Sender:</span>
                <span>{shipment.sender}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-sm">Receiver:</span>
                <span>{shipment.receiver}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-sm">Destination:</span>
                <span className="text-slate-300">{shipment.destination}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-400 text-sm">Current Status:</span>
                
                {/* YAHAN FIX ADD KIYA HAI */}
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  shipment.status?.trim().toLowerCase() === 'delivered' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  shipment.status?.trim().toLowerCase() === 'cancelled'
                    ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {shipment.status}
                </span>
                
              </div>
            </div>

            {/* Map Integration Section */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-2">Destination Map</h3>
              <MapComponent destination={shipment.destination} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}