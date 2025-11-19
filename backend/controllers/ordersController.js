const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const CartItemModel = require('../models/CartItem');
const ProductModel2 = require('../models/Product');


exports.createOrder = async function (req, res) {
const userId = req.userId || req.body.user_id;
const { name, phone, address, alternate_phone, items } = req.body;
if (!userId || !items || !Array.isArray(items) || items.length === 0) {
return res.status(400).json({ message: 'Missing data' });
}


try {
let total = 0;
const populated = await Promise.all(
items.map(async (it) => {
const p = await ProductModel2.findById(it.product_id);
if (!p) throw new Error('Product not found ' + it.product_id);
const price = p.price;
total += price * it.quantity;
return { product: p, quantity: it.quantity, price };
})
);


const order = new Order({ user_id: userId, name, phone, address, alternate_phone, total_amount: total });
const savedOrder = await order.save();


const orderItems = await Promise.all(
populated.map((it) => {
const oi = new OrderItem({ order_id: savedOrder._id, product_id: it.product._id, quantity: it.quantity, price: it.price });
return oi.save();
})
);


await CartItemModel.deleteMany({ user_id: userId, product_id: { $in: items.map(i => i.product_id) } });


res.status(201).json({ order: savedOrder, items: orderItems });
} catch (err) {
res.status(500).json({ message: err.message });
}
};


exports.getOrders = async function (req, res) {
const userId = req.userId || req.query.user_id;
if (!userId) return res.status(400).json({ message: 'user id required' });
try {
const orders = await Order.find({ user_id: userId });
res.json(orders);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


exports.getOrderItems = async function (req, res) {
try {
const items = await OrderItem.find({ order_id: req.params.orderId }).populate('product_id');
res.json(items);
} catch (err) {
res.status(500).json({ message: err.message });
}
};