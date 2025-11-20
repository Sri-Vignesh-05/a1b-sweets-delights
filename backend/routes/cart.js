const express7 = require('express');
const cartCtrl = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const routerCart = express7.Router();

routerCart.get('/', authMiddleware, cartCtrl.getCart);
routerCart.post('/', authMiddleware, cartCtrl.addToCart);
routerCart.put('/:id', authMiddleware, cartCtrl.updateCartItem);
routerCart.delete('/:id', authMiddleware, cartCtrl.removeCartItem);

module.exports = routerCart;