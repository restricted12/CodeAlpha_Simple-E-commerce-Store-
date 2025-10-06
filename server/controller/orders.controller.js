const orderService = require('../services/orders.service');

// Create a new order
async function createOrder(req, res) {
  try {
    // Add user ID if authenticated
    const orderData = {
      ...req.body,
      user: req.user?.userId || null
    };
    
    const order = await orderService.createOrder(orderData);
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

// Update order status
async function updateOrderStatus(req, res) {
  try {
    const { status, note } = req.body;
    const order = await orderService.updateOrderStatus(req.params.id, status, note);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Add tracking information
async function addTrackingInfo(req, res) {
  try {
    const { trackingNumber, carrier } = req.body;
    const order = await orderService.addTrackingInfo(req.params.id, trackingNumber, carrier);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get orders by status
async function getOrdersByStatus(req, res) {
  try {
    const orders = await orderService.getOrdersByStatus(req.params.status);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get order statistics
async function getOrderStats(req, res) {
  try {
    const stats = await orderService.getOrderStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  updateOrderStatus,
  addTrackingInfo,
  getOrdersByStatus,
  getOrderStats,
  deleteOrder
};
