const Order = require('../models/orders');

// Create a new order
async function createOrder(data) {
  const order = new Order(data);
  return await order.save();
}

// Get all orders
async function getAllOrders() {
  return await Order.find().populate('user').populate('products.product');
}

// Get an order by ID
async function getOrderById(id) {
  return await Order.findById(id).populate('user').populate('products.product');
}

// Get orders by user ID
async function getOrdersByUserId(userId) {
  return await Order.find({ user: userId }).populate('user').populate('products.product');
}

// Update an order by ID
async function updateOrder(id, data) {
  return await Order.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

// Delete an order by ID
async function deleteOrder(id) {
  return await Order.findByIdAndDelete(id);
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder
};
