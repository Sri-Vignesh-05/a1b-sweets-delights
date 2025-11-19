const express8 = require('express');
const orderCtrl = require('../controllers/ordersController');
const routerOrder = express8.Router();


routerOrder.post('/', orderCtrl.createOrder);
routerOrder.get('/', orderCtrl.getOrders);
routerOrder.get('/:orderId/items', orderCtrl.getOrderItems);


module.exports = routerOrder;