const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All admin routes require authentication
router.use(authMiddleware);

// Dashboard
router.get('/stats', adminController.getDashboardStats);

// Products Management
router.get('/products', adminController.getAllProducts);
router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Users Management
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserDetails);

// Orders Management
router.get('/orders', adminController.getAllOrders);
router.get('/orders/:id', adminController.getOrderDetails);
router.put('/orders/:id/status', adminController.updateOrderStatus);

module.exports = router;
