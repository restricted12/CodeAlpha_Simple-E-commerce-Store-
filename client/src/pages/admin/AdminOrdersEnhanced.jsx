import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authGet, authPut } from '../../utils/api';
import './AdminOrders.css';

const AdminOrdersEnhanced = () => {
  const { 
    orders, 
    fetchOrders, 
    ordersLoading,
    getOrderStatistics,
    sortOrders,
    filterOrders 
  } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // table or cards

  const orderStatuses = [
    { value: 'pending', label: 'Pending', color: '#f59e0b' },
    { value: 'processing', label: 'Processing', color: '#3b82f6' },
    { value: 'shipped', label: 'Shipped', color: '#8b5cf6' },
    { value: 'delivered', label: 'Delivered', color: '#10b981' },
    { value: 'cancelled', label: 'Cancelled', color: '#ef4444' }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const orderDate = new Date(order.createdAt);
        const now = new Date();
        
        switch (dateFilter) {
          case 'today':
            matchesDate = orderDate.toDateString() === now.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = orderDate >= weekAgo;
            break;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = orderDate >= monthAgo;
            break;
          default:
            matchesDate = true;
        }
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'total-high':
          return b.total - a.total;
        case 'total-low':
          return a.total - b.total;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const handleStatusUpdate = async (orderId, newStatus) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await authPut(`/orders/update-order/${orderId}`, { status: newStatus });
      await fetchOrders();
      setSuccess('Order status updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      for (const orderId of selectedOrders) {
        await authPut(`/orders/update-order/${orderId}`, { status: newStatus });
      }
      await fetchOrders();
      setSelectedOrders([]);
      setShowBulkActions(false);
      setSuccess(`${selectedOrders.length} orders updated successfully!`);
    } catch (err) {
      setError(err.message || 'Failed to update orders');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o._id));
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setError(null);
    setSuccess(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const statusObj = orderStatuses.find(s => s.value === status);
    return statusObj ? statusObj.color : '#6b7280';
  };

  const getStatusLabel = (status) => {
    const statusObj = orderStatuses.find(s => s.value === status);
    return statusObj ? statusObj.label : status;
  };

  const orderStats = getOrderStatistics();

  const stats = {
    total: orders.length,
    pending: orderStats.pending,
    processing: orderStats.processing,
    shipped: orderStats.shipped,
    delivered: orderStats.delivered,
    cancelled: orderStats.cancelled,
    totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0)
  };

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <div className="header-content">
          <h1>Orders Management</h1>
          <p>Manage customer orders and track their status</p>
        </div>
        <div className="header-actions">
          <button
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            ☰ Table
          </button>
          <button
            className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
          >
            ⊞ Cards
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card info">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>{stats.processing}</h3>
            <p>Processing</p>
          </div>
        </div>
        <div className="stat-card primary">
          <div className="stat-icon">🚚</div>
          <div className="stat-content">
            <h3>{stats.shipped}</h3>
            <p>Shipped</p>
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.delivered}</h3>
            <p>Delivered</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>{formatCurrency(stats.totalRevenue)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="orders-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search orders by ID, customer name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            {orderStatuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="total-high">Highest Total</option>
            <option value="total-low">Lowest Total</option>
            <option value="status">Status A-Z</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="bulk-actions">
          <div className="bulk-info">
            <span>{selectedOrders.length} orders selected</span>
          </div>
          <div className="bulk-buttons">
            {orderStatuses.map(status => (
              <button
                key={status.value}
                className="bulk-btn"
                onClick={() => handleBulkStatusUpdate(status.value)}
                disabled={loading}
                style={{ backgroundColor: status.color }}
              >
                Set to {status.label}
              </button>
            ))}
            <button
              className="bulk-btn"
              onClick={() => setSelectedOrders([])}
            >
              ✕ Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Success/Error Messages */}
      {success && (
        <div className="alert success">
          <span>✅</span>
          {success}
        </div>
      )}

      {error && (
        <div className="alert error">
          <span>❌</span>
          {error}
        </div>
      )}

      {/* Orders Display */}
      <div className="orders-container">
        {ordersLoading ? (
          <div className="loading">Loading orders...</div>
        ) : viewMode === 'cards' ? (
          <div className="orders-grid">
            {filteredOrders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order._id)}
                    onChange={() => handleSelectOrder(order._id)}
                  />
                </div>
                <div className="order-header">
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </div>
                <div className="order-info">
                  <div className="customer-info">
                    <h4>{order.user?.firstName || order.customer?.firstName} {order.user?.lastName || order.customer?.lastName}</h4>
                    <p>{order.user?.email || order.customer?.email}</p>
                  </div>
                  <div className="order-details">
                    <p><strong>Total:</strong> {formatCurrency(order.total)}</p>
                    <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                    <p><strong>Items:</strong> {order.items?.length || 0}</p>
                  </div>
                </div>
                <div className="order-actions">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className="status-select"
                    style={{ borderColor: getStatusColor(order.status) }}
                  >
                    {orderStatuses.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <button
                    className="view-btn"
                    onClick={() => handleViewOrder(order)}
                  >
                    👁️ View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order._id)}
                        onChange={() => handleSelectOrder(order._id)}
                      />
                    </td>
                    <td>
                      <span className="order-id">#{order._id.slice(-8)}</span>
                    </td>
                    <td>
                      <div className="customer-info">
                        <h4>{order.user?.firstName} {order.user?.lastName}</h4>
                        <p>{order.user?.email}</p>
                      </div>
                    </td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td className="total">{formatCurrency(order.total)}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className="status-select"
                        style={{ borderColor: getStatusColor(order.status) }}
                      >
                        {orderStatuses.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() => handleViewOrder(order)}
                        >
                          👁️ View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredOrders.length === 0 && !ordersLoading && (
          <div className="empty-state">
            <p>No orders found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h2>Order Details - #{selectedOrder._id.slice(-8)}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <div className="order-details">
              <div className="order-info">
                <div className="info-section">
                  <h3>Customer Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Name:</label>
                      <span>{selectedOrder.user?.firstName} {selectedOrder.user?.lastName}</span>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <span>{selectedOrder.user?.email}</span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3>Order Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Order Date:</label>
                      <span>{formatDate(selectedOrder.createdAt)}</span>
                    </div>
                    <div className="info-item">
                      <label>Status:</label>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                      >
                        {getStatusLabel(selectedOrder.status)}
                      </span>
                    </div>
                    <div className="info-item">
                      <label>Total:</label>
                      <span className="total-amount">{formatCurrency(selectedOrder.total)}</span>
                    </div>
                    <div className="info-item">
                      <label>Items Count:</label>
                      <span>{selectedOrder.items?.length || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3>Order Items</h3>
                  <div className="order-items">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-image">
                          {item.product?.image || item.image ? (
                            <img src={item.product?.image || item.image} alt={item.product?.name || item.name} />
                          ) : (
                            <div className="no-image">📦</div>
                          )}
                        </div>
                        <div className="item-details">
                          <h4>{item.product?.name || item.name}</h4>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: {formatCurrency((item.product?.price ?? item.price) || 0)}</p>
                        </div>
                        <div className="item-total">
                          {formatCurrency(((item.product?.price ?? item.price) || 0) * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersEnhanced;
