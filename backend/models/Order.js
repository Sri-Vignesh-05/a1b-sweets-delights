const mongoose4 = require('mongoose');

const OrderSchema = new mongoose4.Schema({
  user_id: { type: mongoose4.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  alternate_phone: { type: String },
  total_amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose4.models.Order || mongoose4.model('Order', OrderSchema);
