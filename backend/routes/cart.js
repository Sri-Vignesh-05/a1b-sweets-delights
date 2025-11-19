const express7 = require('express');
const cartCtrl = require('../controllers/cartController');
const routerCart = express7.Router();


routerCart.get('/', cartCtrl.getCart);
routerCart.post('/', cartCtrl.addToCart);
routerCart.put('/:id', cartCtrl.updateCartItem);
routerCart.delete('/:id', cartCtrl.removeCartItem);


module.exports = routerCart;