const Order = require('../models/orders');

// Create a new order
async function createOrder(data) {
  // Add initial status to history
  const orderData = {
    ...data,
    statusHistory: [{
      status: data.status || 'pending',
      timestamp: new Date(),
      note: 'Order created'
    }]
  };
  
  const order = new Order(orderData);
  return await order.save();
}

// Get all orders
async function getAllOrders() {
  return await Order.find()
    .populate('user')
    .populate('items.product')
    .sort({ createdAt: -1 });
}

// Get an order by ID
async function getOrderById(id) {
  return await Order.findById(id)
    .populate('user')
    .populate('items.product');
}

// Get orders by user ID
async function getOrdersByUserId(userId) {
  return await Order.find({ user: userId })
    .populate('user')
    .populate('items.product')
    .sort({ createdAt: -1 });
}

// Update an order by ID
async function updateOrder(id, data) {
  const order = await Order.findById(id);
  if (!order) {
    throw new Error('Order not found');
  }

  // Track status changes
  if (data.status && data.status !== order.status) {
    data.statusHistory = [
      ...order.statusHistory,
      {
        status: data.status,
        timestamp: new Date(),
        note: data.statusNote || `Status changed to ${data.status}`
      }
    ];
  }

  return await Order.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

// Update order status
async function updateOrderStatus(id, status, note = '') {
  const order = await Order.findById(id);
  if (!order) {
    throw new Error('Order not found');
  }

  const updateData = {
    status,
    statusHistory: [
      ...order.statusHistory,
      {
        status,
        timestamp: new Date(),
        note: note || `Status changed to ${status}`
      }
    ]
  };

  return await Order.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
}

// Add tracking information
async function addTrackingInfo(id, trackingNumber, carrier) {
  const updateData = {
    trackingNumber,
    carrier,
    status: 'shipped',
    statusHistory: [
      ...(await Order.findById(id)).statusHistory,
      {
        status: 'shipped',
        timestamp: new Date(),
        note: `Order shipped via ${carrier}. Tracking: ${trackingNumber}`
      }
    ]
  };

  return await Order.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
}

// Get orders by status
async function getOrdersByStatus(status) {
  return await Order.find({ status })
    .populate('user')
    .populate('items.product')
    .sort({ createdAt: -1 });
}

// Get order statistics
async function getOrderStats() {
  const stats = await Order.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalValue: { $sum: '$total' }
      }
    }
  ]);

  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $group: { _id: null, total: { $sum: '$total' } } }
  ]);

  return {
    byStatus: stats,
    totalOrders,
    totalRevenue: totalRevenue[0]?.total || 0
  };
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
  updateOrderStatus,
  addTrackingInfo,
  getOrdersByStatus,
  getOrderStats,
  deleteOrder
};
