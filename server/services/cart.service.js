const Cart = require('../models/cart');

// Create a new cart
async function createCart(data) {
  const cart = new Cart(data);
  return await cart.save();
}

// Get all carts
async function getAllCarts() {
  return await Cart.find().populate('user').populate('items.product');
}

// Get a cart by ID
async function getCartById(id) {
  return await Cart.findById(id).populate('user').populate('items.product');
}

// Get a cart by user ID
async function getCartByUserId(userId) {
  return await Cart.findOne({ user: userId }).populate('user').populate('items.product');
}

// Update a cart by ID
async function updateCart(id, data) {
  return await Cart.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

// Delete a cart by ID
async function deleteCart(id) {
  return await Cart.findByIdAndDelete(id);
}

// Add item to cart
async function addItemToCart(userId, product, quantity) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [{ product, quantity }] });
  } else {
    const itemIndex = cart.items.findIndex(item => item.product.toString() === product);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }
  }
  return await cart.save();
}

// Remove item from cart
async function removeItemFromCart(userId, product) {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return null;
  cart.items = cart.items.filter(item => item.product.toString() !== product);
  return await cart.save();
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
