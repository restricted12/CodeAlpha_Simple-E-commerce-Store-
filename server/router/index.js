const express = require('express');
const router = express.Router();

// Import all route files
const userRoutes = require('./user.route');
const cartRoutes = require('./cart.route');
const orderRoutes = require('./orders.route');
const productRoutes = require('./products.route');

// Mount routes
router.use('/users', userRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);

module.exports = router;
