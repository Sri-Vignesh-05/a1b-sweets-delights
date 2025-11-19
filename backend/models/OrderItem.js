const mongoose5 = require('mongoose');

const OrderItemSchema = new mongoose5.Schema({
  order_id: { type: mongoose5.Schema.Types.ObjectId, ref: 'Order', required: true },
  product_id: { type: mongoose5.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose5.models.OrderItem || mongoose5.model('OrderItem', OrderItemSchema);
