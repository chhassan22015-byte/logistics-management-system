import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // 1. Naya Import Add Kiya

import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
// Register import hata diya kyunke ab Login file hi dono kaam kar rahi hai
import CreateShipment from './pages/CreateShipment';
import ShipmentList from './pages/ShipmentList';
import TrackShipment from './pages/TrackShipment';
import Dashboard from './pages/Dashboard'; 

export default function App() {
  return (
    // 2. Poori app ko GoogleOAuthProvider ke andar wrap kar diya
    <GoogleOAuthProvider clientId="dummy-client-id-for-now">
      <Router>
        <Routes>
          {/* 1. Public Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Public Tracking Portal for Receivers */}
          <Route path="/track" element={<TrackShipment />} />

          {/* 2. Portal Pages (Left Sidebar ke sath) */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/shipments" element={<ShipmentList />} />
            <Route path="/create-shipment" element={<CreateShipment />} />
          </Route>

          {/* 3. Authentication Page (Login/Register Combined) */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}