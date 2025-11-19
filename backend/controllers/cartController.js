const CartItem = require('../models/CartItem');
const ProductModel = require('../models/Product');


exports.getCart = async function (req, res) {
const userId = req.userId || req.query.user_id;
if (!userId) return res.status(400).json({ message: 'user id required' });
try {
const items = await CartItem.find({ user_id: userId }).populate('product_id');
res.json(items);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


exports.addToCart = async function (req, res) {
const userId = req.userId || req.body.user_id;
const { product_id, quantity = 1 } = req.body;
if (!userId || !product_id) return res.status(400).json({ message: 'user_id and product_id required' });
try {
const existing = await CartItem.findOne({ user_id: userId, product_id });
if (existing) {
existing.quantity = existing.quantity + quantity;
await existing.save();
return res.json(existing);
}
const item = new CartItem({ user_id: userId, product_id, quantity });
const saved = await item.save();
res.status(201).json(saved);
} catch (err) {
res.status(400).json({ message: err.message });
}
};


exports.updateCartItem = async function (req, res) {
const userId = req.userId || req.body.user_id;
const { quantity } = req.body;
try {
const item = await CartItem.findOneAndUpdate(
{ _id: req.params.id, user_id: userId },
{ quantity },
{ new: true }
);
if (!item) return res.status(404).json({ message: 'Not found' });
res.json(item);
} catch (err) {
res.status(400).json({ message: err.message });
}
};


exports.removeCartItem = async function (req, res) {
const userId = req.userId || req.query.user_id;
try {
const item = await CartItem.findOneAndDelete({ _id: req.params.id, user_id: userId });
if (!item) return res.status(404).json({ message: 'Not found' });
res.json({ message: 'Removed' });
} catch (err) {
res.status(500).json({ message: err.message });
}
};