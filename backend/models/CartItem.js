const mongoose3 = require('mongoose');

const CartItemSchema = new mongoose3.Schema({
  user_id: { type: mongoose3.Schema.Types.ObjectId, required: true },
  product_id: { type: mongoose3.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min: 1 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

CartItemSchema.index({ user_id: 1, product_id: 1 }, { unique: true });

CartItemSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

CartItemSchema.pre('findOneAndUpdate', function (next) {
  if (!this._update) this._update = {};
  this._update.updated_at = Date.now();
  next();
});

module.exports = mongoose3.models.CartItem || mongoose3.model('CartItem', CartItemSchema);