const db = require('../config/db');

exports.getShipments = async (req, res) => {
  try {
    const [shipments] = await db.query('SELECT * FROM shipments ORDER BY created_at DESC');
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.createShipment = async (req, res) => {
  try {
    const { trackingId, sender, receiver, destination, weight, status } = req.body;
    const userId = req.user.id; // authMiddleware se aya

    const [result] = await db.query(
      'INSERT INTO shipments (trackingId, sender, receiver, destination, weight, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [trackingId, sender, receiver, destination, weight, status, userId]
    );

    res.status(201).json({ message: 'Shipment created successfully', shipmentId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Shipment create error', error: error.message });
  }
};

// Shipment ka status update karne ke liye (Sirf Admin ke liye)
exports.updateShipmentStatus = async (req, res) => {
  try {
    const { id } = req.params; // URL se shipment ki ID aayegi
    const { status } = req.body; // Request body se naya status aayega

    // Status ki validity check karna
    const validStatuses = ['Processing', 'In-Transit', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Ghalat status value provide ki gayi hai' });
    }

    // Check karein ke shipment database mein mojood hai ya nahi
    const [shipments] = await db.query('SELECT * FROM shipments WHERE id = ?', [id]);
    if (shipments.length === 0) {
      return res.status(404).json({ message: 'Yeh shipment nahi mili' });
    }

    // Database mein status update karna
    await db.query('UPDATE shipments SET status = ? WHERE id = ?', [status, id]);

    res.status(200).json({
      message: 'Shipment status successfully update ho gaya hai!',
      shipmentId: id,
      newStatus: status
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ==========================================
// NAYA FUNCTION: Public Tracking API
// ==========================================
exports.trackShipment = async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    // Database se 'trackingId' ke zariye search karna
    const [shipments] = await db.query(
      'SELECT * FROM shipments WHERE trackingId = ?', 
      [trackingNumber]
    );

    if (shipments.length === 0) {
      return res.status(404).json({ message: 'Yeh tracking number mojood nahi hai.' });
    }

    // Customer ko shipment ka data wapas bhejna
    res.json(shipments[0]); 
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};