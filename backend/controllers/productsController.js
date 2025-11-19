const Product = require('../models/Product');


exports.getProducts = async function (req, res) {
try {
const products = await Product.find();
res.json(products);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


exports.getProduct = async function (req, res) {
try {
const product = await Product.findById(req.params.id);
if (!product) return res.status(404).json({ message: 'Product not found' });
res.json(product);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


exports.createProduct = async function (req, res) {
try {
const p = new Product(req.body);
const saved = await p.save();
res.status(201).json(saved);
} catch (err) {
res.status(400).json({ message: err.message });
}
};


exports.updateProduct = async function (req, res) {
try {
const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(updated);
} catch (err) {
res.status(400).json({ message: err.message });
}
};


exports.deleteProduct = async function (req, res) {
try {
await Product.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted' });
} catch (err) {
res.status(500).json({ message: err.message });
}
};