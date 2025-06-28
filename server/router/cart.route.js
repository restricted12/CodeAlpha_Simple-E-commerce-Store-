const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart.controller');
const auth = require('../middleware/auth');

// Protect all cart routes with auth middleware
router.use(auth);

// Create a new cart
router.post('/', cartController.createCart);

// Get all carts
router.get('/', cartController.getAllCarts);

// Get a cart by ID
router.get('/:id', cartController.getCartById);

// Get a cart by user ID
router.get('/user/:userId', cartController.getCartByUserId);

// Update a cart by ID
router.put('/:id', cartController.updateCart);

// Delete a cart by ID
router.delete('/:id', cartController.deleteCart);

// Add item to cart
router.post('/user/:userId/add', cartController.addItemToCart);

// Remove item from cart
router.post('/user/:userId/remove', cartController.removeItemFromCart);

module.exports = router;
