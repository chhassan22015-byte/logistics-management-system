const express = require('express');
const router = express.Router();
const { 
  getShipments, 
  createShipment, 
  updateShipmentStatus,
  trackShipment // <-- 1. Naya function import kiya hai
} = require('../controllers/shipmentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// ==========================================
// PUBLIC ROUTES (Bina Login Ke)
// ==========================================

// Customer ke liye public tracking route (No 'protect' middleware)
router.get('/track/:trackingNumber', trackShipment);


// ==========================================
// PROTECTED ROUTES (Sirf Logged-in Users)
// ==========================================

router.route('/')
  .get(protect, getShipments)
  .post(protect, createShipment);

// Naya Route: Sirf Admin hi shipment ka status update kar sakega
router.route('/:id/status').put(protect, authorizeRoles('admin'), updateShipmentStatus);

module.exports = router;