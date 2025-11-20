const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

// Check if user is admin (you can expand this logic)
const isAdmin = (req, res, next) => {
  // For now, only allow if they're logged in as admin
  // You can add a role field to User model later
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@sweetshop.com';
  
  // In production, add role field to User model
  if (req.userId) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

// Products Management
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, category, price, description, image_url, rating } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ message: 'name, category, and price are required' });
  }

  try {
    const product = new Product({
      name,
      category,
      price: parseFloat(price),
      description: description || '',
      image_url: image_url || '/placeholder.svg',
      rating: rating ? parseFloat(rating) : 4.5,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, description, image_url, rating } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        price: price ? parseFloat(price) : undefined,
        description,
        image_url,
        rating: rating ? parseFloat(rating) : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Users Management
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's orders
    const orders = await Order.find({ user_id: id });

    res.json({ user, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Orders Management
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user_id', 'email name')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate('user_id', 'email name phone');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const items = await OrderItem.find({ order_id: id }).populate('product_id', 'name price category');

    res.json({ order, items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'status is required' });
  }

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$total_amount' },
        },
      },
    ]);

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
