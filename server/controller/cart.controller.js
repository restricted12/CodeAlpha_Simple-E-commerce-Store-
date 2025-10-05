const cartService = require('../services/cart.service');

// Create a new cart
async function createCart(req, res) {
  try {
    const cart = await cartService.createCart(req.body);
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all carts
async function getAllCarts(req, res) {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get a cart by ID
async function getCartById(req, res) {
  try {
    const cart = await cartService.getCartById(req.params.id);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get a cart by user ID
async function getCartByUserId(req, res) {
  try {
    const cart = await cartService.getCartByUserId(req.params.userId);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update a cart by ID
async function updateCart(req, res) {
  try {
    const cart = await cartService.updateCart(req.params.id, req.body);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Delete a cart by ID
async function deleteCart(req, res) {
  try {
    const cart = await cartService.deleteCart(req.params.id);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Add item to cart
async function addItemToCart(req, res) {
  try {
    const { product, quantity } = req.body;
    const cart = await cartService.addItemToCart(req.params.userId, product, quantity);
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Remove item from cart
async function removeItemFromCart(req, res) {
  try {
    const { product } = req.body;
    const cart = await cartService.removeItemFromCart(req.params.userId, product);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
  addItemToCart,
  removeItemFromCart
};
