const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    required: true,
    unique: true
  },
  sender: {
    type: String,
    required: [true, 'Please add sender name']
  },
  receiver: {
    type: String,
    required: [true, 'Please add receiver name']
  },
  destination: {
    type: String,
    required: [true, 'Please add destination city']
  },
  weight: {
    type: String,
    required: [true, 'Please add weight']
  },
  status: {
    type: String,
    enum: ['Processing', 'In Transit', 'Delivered'],
    default: 'Processing'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema);