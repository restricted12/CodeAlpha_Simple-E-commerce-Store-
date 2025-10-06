const express = require('express');
const router = express.Router();
const orderController = require('../controller/orders.controller');
const auth = require('../middleware/auth');

// Protect all order routes with auth middleware
router.use(auth);

// Create a new order
router.post('/create-order', orderController.createOrder);

// Get all orders
router.get('/all-orders', orderController.getAllOrders);

// Get an order by ID
router.get('/get-single-order/:id', orderController.getOrderById);

// Get orders by user ID
router.get('/get-orders-byuser/user/:userId', orderController.getOrdersByUserId);

// Update an order by ID
router.put('/update-order/:id', orderController.updateOrder);

// Update order status
router.put('/update-status/:id', orderController.updateOrderStatus);

// Add tracking information
router.put('/add-tracking/:id', orderController.addTrackingInfo);

// Get orders by status
router.get('/status/:status', orderController.getOrdersByStatus);

// Get order statistics
router.get('/stats', orderController.getOrderStats);

// Delete an order by ID
router.delete('/delete-order/:id', orderController.deleteOrder);

module.exports = router;
