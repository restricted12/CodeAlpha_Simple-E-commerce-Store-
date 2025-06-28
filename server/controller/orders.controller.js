const orderService = require('../services/orders.service');

// Create a new order
async function createOrder(req, res) {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get an order by ID
async function getOrderById(req, res) {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get orders by user ID
async function getOrdersByUserId(req, res) {
  try {
    const orders = await orderService.getOrdersByUserId(req.params.userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update an order by ID
async function updateOrder(req, res) {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Delete an order by ID
async function deleteOrder(req, res) {
  try {
    const order = await orderService.deleteOrder(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder
};
