const express6 = require('express');
const prodCtrl = require('../controllers/productsController');
const routerProd = express6.Router();

routerProd.get('/', prodCtrl.getProducts);
routerProd.get('/:id', prodCtrl.getProduct);
routerProd.post('/', prodCtrl.createProduct);
routerProd.put('/:id', prodCtrl.updateProduct);
routerProd.delete('/:id', prodCtrl.deleteProduct);

module.exports = routerProd;
