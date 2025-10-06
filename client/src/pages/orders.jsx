import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaEye,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBox,
  FaSpinner,
  FaArrowLeft,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, orders, fetchOrders, loading: ordersLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Order status configuration
  const orderStatuses = {
    pending: {
      label: 'Pending',
      icon: FaClock,
      color: '#ffc107',
      bgColor: '#fff3cd'
    },
    confirmed: {
      label: 'Confirmed',
      icon: FaCheckCircle,
      color: '#17a2b8',
      bgColor: '#d1ecf1'
    },
    processing: {
      label: 'Processing',
      icon: FaBox,
      color: '#007bff',
      bgColor: '#cce7ff'
    },
    shipped: {
      label: 'Shipped',
      icon: FaTruck,
      color: '#28a745',
      bgColor: '#d4edda'
    },
    delivered: {
      label: 'Delivered',
      icon: FaCheckCircle,
      color: '#28a745',
      bgColor: '#d4edda'
    },
    cancelled: {
      label: 'Cancelled',
      icon: FaTimesCircle,
      color: '#dc3545',
      bgColor: '#f8d7da'
    }
  };

  // Load orders when component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchOrders();
    }
  }, [isAuthenticated, user, fetchOrders]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/orders' } });
    }
  }, [isAuthenticated, navigate]);

  const getStatusIcon = (status) => {
    const statusConfig = orderStatuses[status] || orderStatuses.pending;
    const IconComponent = statusConfig.icon;
    return <IconComponent style={{ color: statusConfig.color }} />;
  };

  const getStatusColor = (status) => {
    return orderStatuses[status]?.color || '#6c757d';
  };

  const getStatusBgColor = (status) => {
    return orderStatuses[status]?.bgColor || '#f8f9fa';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.items?.some(item => 
                             item.name.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'total_high':
          return b.total - a.total;
        case 'total_low':
          return a.total - b.total;
        default:
          return 0;
      }
    });

  const getTotalItems = (order) => {
    return order.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  if (!isAuthenticated) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="not-authenticated">
            <h1>Please log in to view your orders</h1>
            <p>You need to be logged in to access your order history.</p>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        {/* Header */}
        <div className="orders-header">
          <button 
            className="btn btn-outline-secondary mb-3"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Back
          </button>
          <h1>My Orders</h1>
          <p>Track and manage your orders</p>
        </div>

        {/* Filters and Search */}
        <div className="orders-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search orders or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <FaFilter className="filter-icon" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="filter-group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="total_high">Total: High to Low</option>
                <option value="total_low">Total: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {ordersLoading && (
          <div className="loading-state">
            <FaSpinner className="spinning" />
            <p>Loading your orders...</p>
          </div>
        )}

        {/* Orders List */}
        {!ordersLoading && (
          <>
            {filteredOrders.length === 0 ? (
              <div className="no-orders">
                <FaBox className="no-orders-icon" />
                <h3>No Orders Found</h3>
                <p>
                  {searchTerm || statusFilter !== 'all' 
                    ? 'No orders match your current filters.' 
                    : "You haven't placed any orders yet."
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Link to="/products" className="btn btn-primary">
                    Start Shopping
                  </Link>
                )}
              </div>
            ) : (
              <div className="orders-list">
                {filteredOrders.map((order) => (
                  <div key={order._id} className="order-card">
                    {/* Order Header */}
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order #{order._id}</h3>
                        <p className="order-date">Placed on {formatDate(order.createdAt)}</p>
                        <p className="order-items-count">
                          {getTotalItems(order)} item{getTotalItems(order) !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="order-status">
                        <div 
                          className="status-badge"
                          style={{ 
                            backgroundColor: getStatusBgColor(order.status),
                            color: getStatusColor(order.status)
                          }}
                        >
                          {getStatusIcon(order.status)}
                          <span>{orderStatuses[order.status]?.label || 'Unknown'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="order-items-preview">
                      <div className="items-grid">
                        {order.items?.slice(0, 3).map((item, index) => (
                          <div key={index} className="item-preview">
                            <img 
                              src={item.image || 'https://via.placeholder.com/60x60?text=Product'} 
                              alt={item.name}
                              className="item-image"
                            />
                            <div className="item-info">
                              <h5>{item.name}</h5>
                              <p>Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                        {order.items?.length > 3 && (
                          <div className="more-items">
                            +{order.items.length - 3} more items
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                      <div className="summary-details">
                        <div className="summary-row">
                          <span>Subtotal:</span>
                          <span>{formatPrice(order.subtotal)}</span>
                        </div>
                        <div className="summary-row">
                          <span>Shipping:</span>
                          <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
                        </div>
                        <div className="summary-row">
                          <span>Tax:</span>
                          <span>{formatPrice(order.tax)}</span>
                        </div>
                        <hr />
                        <div className="summary-row total">
                          <span>Total:</span>
                          <span>{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="order-actions">
                      <Link 
                        to={`/order-tracking/${order._id}`}
                        className="btn btn-outline-primary"
                      >
                        <FaEye /> View Details
                      </Link>
                      {order.status === 'delivered' && (
                        <button className="btn btn-outline-secondary">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;