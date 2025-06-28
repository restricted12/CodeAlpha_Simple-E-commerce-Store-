const express = require('express');
const router = express.Router();
const productController = require('../controller/products.controller');
const auth = require('../middleware/auth');

// Public routes
router.get('/get-all-products', productController.getAllProducts);
router.get('/get-product/:id', productController.getProductById);

// Protected routes
router.post('/add-product',auth, productController.createProduct);
router.put('/update-product/:id', auth, productController.updateProduct);
router.delete('/delete-product/:id', auth, productController.deleteProduct);

module.exports = router;
