import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authGet, authPut } from '../../utils/api';
import './AdminOrders.css';

const AdminOrders = () => {
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

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <div className="header-content">
          <h1>Orders Management</h1>
          <p>Manage customer orders and track their status</p>
        </div>
        <div className="order-stats">
          <div className="stat-item">
            <span className="stat-number">{orderStats.total}</span>
            <span className="stat-label">Total Orders</span>
          </div>
          <div className="stat-item pending">
            <span className="stat-number">{orderStats.pending}</span>
            <span className="stat-label">Pending</span>
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

      {/* Orders Table */}
      <div className="orders-table-container">
        {ordersLoading ? (
          <div className="loading">Loading orders...</div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
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
          <div className="modal">
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
                  </div>
                </div>

                <div className="info-section">
                  <h3>Order Items</h3>
                  <div className="order-items">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-image">
                          {item.product?.image ? (
                            <img src={item.product.image} alt={item.product.name} />
                          ) : (
                            <div className="no-image">📦</div>
                          )}
                        </div>
                        <div className="item-details">
                          <h4>{item.product?.name}</h4>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: {formatCurrency(item.product?.price || 0)}</p>
                        </div>
                        <div className="item-total">
                          {formatCurrency((item.product?.price || 0) * item.quantity)}
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

export default AdminOrders;
