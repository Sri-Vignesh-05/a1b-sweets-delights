const express8 = require('express');
const orderCtrl = require('../controllers/ordersController');
const authMiddleware = require('../middleware/authMiddleware');
const routerOrder = express8.Router();

routerOrder.post('/', authMiddleware, orderCtrl.createOrder);
routerOrder.get('/', authMiddleware, orderCtrl.getOrders);
routerOrder.get('/:orderId/items', authMiddleware, orderCtrl.getOrderItems);

module.exports = routerOrder;