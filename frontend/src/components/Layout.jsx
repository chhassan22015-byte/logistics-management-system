import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  // Logout ka function jo token remove karke wapas login page par bhej dega
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex-col justify-between hidden md:flex">
        <div>
          {/* Logo / Brand */}
          <div className="p-6 border-b border-slate-700">
            <h1 className="text-xl font-bold tracking-wide text-blue-400">
              Logistics App
            </h1>
            <p className="text-xs text-slate-400 mt-1">Management Portal</p>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            {/* YAHAN MASLA THA: to="/" ko to="/dashboard" kar diya gaya hai */}
            <Link to="/dashboard" className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
              📊 Dashboard
            </Link>
            <Link to="/shipments" className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
              📦 All Shipments
            </Link>
            <Link to="/create-shipment" className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
              ➕ Create Shipment
            </Link>
          </nav>
        </div>

        {/* Bottom User / Auth Links */}
        <div className="p-4 border-t border-slate-700">
          {/* Portal ke andar aakar Login ki bajaye Logout button hona chahiye */}
          <button 
            onClick={handleLogout}
            className="w-full text-center bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white hover:border-red-600 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Right Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Mobile Header (Only for small screens) */}
        <header className="bg-slate-800 border-b border-slate-700 p-4 md:hidden flex justify-between items-center">
          <h1 className="font-bold text-blue-400">Logistics App</h1>
          <div className="space-x-2 text-xs">
            {/* Mobile menu mein bhi /dashboard update kar diya hai */}
            <Link to="/dashboard" className="px-2 py-1 bg-slate-700 rounded">Dashboard</Link>
            <Link to="/shipments" className="px-2 py-1 bg-slate-700 rounded">Shipments</Link>
          </div>
        </header>

        {/* Dynamic Page Content will render here */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>

    </div>
  );
}