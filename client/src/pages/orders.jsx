import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaShoppingBag,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaCalendarAlt,
  FaDollarSign,
  FaBox,
  FaUser,
  FaArrowLeft,
  FaFilter,
  FaSort,
  FaRefresh
} from 'react-icons/fa';
import './orders.css';

const Orders = () => {
  const { 
    user, 
    isAuthenticated, 
    orders, 
    ordersLoading, 
    ordersError, 
    getOrderStatistics, 
    sortOrders, 
    filterOrders, 
    refreshOrders 
  } = useAuth();
  
  const navigate = useNavigate();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Filter and sort orders when orders or filters change
    let filtered = filterOrders(orders, { status: statusFilter });
    filtered = sortOrders(filtered, sortBy);
    setFilteredOrders(filtered);
  }, [orders, statusFilter, sortBy, filterOrders, sortOrders]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'processing':
        return <FaBox className="status-icon processing" />;
      case 'shipped':
        return <FaTruck className="status-icon shipped" />;
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      case 'cancelled':
        return <FaTimesCircle className="status-icon cancelled" />;
      default:
        return <FaClock className="status-icon" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'pending';
      case 'processing':
        return 'processing';
      case 'shipped':
        return 'shipped';
      case 'delivered':
        return 'delivered';
      case 'cancelled':
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleRefresh = () => {
    refreshOrders();
  };

  const getOrderStats = () => {
    return getOrderStatistics();
  };

  if (!isAuthenticated) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="orders-content text-center">
                <div className="orders-header">
                  <h2>My Orders</h2>
                  <p>Please log in to view your order history</p>
                </div>
                <div className="mt-4">
                  <Link to="/login" className="btn btn-primary me-3">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-outline-primary">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const orderStats = getOrderStats();

  return (
    <div className="orders-page">
      <div className="container">
        {/* Header */}
        <div className="orders-header">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
              <Link to="/profile" className="btn btn-outline-secondary me-3">
                <FaArrowLeft /> Back to Profile
              </Link>
              <div>
                <h1 className="mb-1">My Orders</h1>
                <p className="text-muted mb-0">Track your order history and status</p>
              </div>
            </div>
            <button 
              className="btn btn-outline-primary"
              onClick={handleRefresh}
              disabled={ordersLoading}
            >
              <FaRefresh className={ordersLoading ? 'fa-spin' : ''} /> Refresh
            </button>
          </div>

          {/* Order Statistics */}
          {!ordersLoading && !ordersError && orders.length > 0 && (
            <div className="order-stats mb-4">
              <div className="row">
                <div className="col-md-2 col-4 mb-2">
                  <div className="stat-card">
                    <div className="stat-number">{orderStats.total}</div>
                    <div className="stat-label">Total Orders</div>
                  </div>
                </div>
                <div className="col-md-2 col-4 mb-2">
                  <div className="stat-card">
                    <div className="stat-number">{orderStats.pending}</div>
                    <div className="stat-label">Pending</div>
                  </div>
                </div>
                <div className="col-md-2 col-4 mb-2">
                  <div className="stat-card">
                    <div className="stat-number">{orderStats.processing}</div>
                    <div className="stat-label">Processing</div>
                  </div>
                </div>
                <div className="col-md-2 col-4 mb-2">
                  <div className="stat-card">
                    <div className="stat-number">{orderStats.shipped}</div>
                    <div className="stat-label">Shipped</div>
                  </div>
                </div>
                <div className="col-md-2 col-4 mb-2">
                  <div className="stat-card">
                    <div className="stat-number">{orderStats.delivered}</div>
                    <div className="stat-label">Delivered</div>
                  </div>
                </div>
                <div className="col-md-2 col-4 mb-2">
                  <div className="stat-card">
                    <div className="stat-number">{orderStats.cancelled}</div>
                    <div className="stat-label">Cancelled</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filters and Sorting */}
          {!ordersLoading && !ordersError && orders.length > 0 && (
            <div className="filters-section mb-4">
              <div className="row align-items-center">
                <div className="col-md-6 mb-2">
                  <div className="d-flex align-items-center">
                    <FaFilter className="me-2" />
                    <label className="me-2">Filter by Status:</label>
                    <select 
                      className="form-select form-select-sm"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="d-flex align-items-center justify-content-md-end">
                    <FaSort className="me-2" />
                    <label className="me-2">Sort by:</label>
                    <select 
                      className="form-select form-select-sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="total-high">Total: High to Low</option>
                      <option value="total-low">Total: Low to High</option>
                      <option value="status">Status</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {ordersLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading your orders...</p>
          </div>
        )}

        {/* Error State */}
        {ordersError && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {ordersError}
            <button 
              className="btn btn-outline-danger btn-sm ms-3"
              onClick={refreshOrders}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Orders List */}
        {!ordersLoading && !ordersError && (
          <div className="orders-content">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-5">
                {orders.length === 0 ? (
                  <>
                    <FaShoppingBag className="empty-icon mb-3" />
                    <h3>No Orders Yet</h3>
                    <p className="text-muted">You haven't placed any orders yet.</p>
                    <Link to="/products" className="btn btn-primary">
                      Start Shopping
                    </Link>
                  </>
                ) : (
                  <>
                    <FaFilter className="empty-icon mb-3" />
                    <h3>No Orders Match Your Filter</h3>
                    <p className="text-muted">Try adjusting your filters to see more orders.</p>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => setStatusFilter('all')}
                    >
                      Clear Filters
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="row">
                {filteredOrders.map((order) => (
                  <div key={order._id} className="col-12 mb-4">
                    <div className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <h5 className="order-id">Order #{order._id.slice(-8).toUpperCase()}</h5>
                          <p className="order-date">
                            <FaCalendarAlt className="me-2" />
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="order-status">
                          <span className={`status-badge ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="order-summary">
                        <div className="order-items">
                          <p className="mb-2">
                            <strong>{order.products.length}</strong> item{order.products.length !== 1 ? 's' : ''}
                          </p>
                          <div className="items-preview">
                            {order.products.slice(0, 3).map((item, index) => (
                              <span key={index} className="item-name">
                                {item.product?.name || `Product ${index + 1}`} 
                                {item.quantity > 1 && ` (x${item.quantity})`}
                              </span>
                            ))}
                            {order.products.length > 3 && (
                              <span className="more-items">
                                +{order.products.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="order-total">
                          <p className="total-amount">
                            <FaDollarSign className="me-1" />
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="order-actions">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          <FaEye className="me-2" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="order-details-modal">
          <div className="modal-overlay" onClick={handleCloseOrderDetails}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Order Details</h3>
              <button 
                className="btn-close"
                onClick={handleCloseOrderDetails}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="order-details-info">
                <div className="detail-row">
                  <span className="detail-label">Order ID:</span>
                  <span className="detail-value">#{selectedOrder._id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Order Date:</span>
                  <span className="detail-value">{formatDate(selectedOrder.createdAt)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status-badge ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </span>
                </div>
                {selectedOrder.updatedAt && selectedOrder.updatedAt !== selectedOrder.createdAt && (
                  <div className="detail-row">
                    <span className="detail-label">Last Updated:</span>
                    <span className="detail-value">{formatDate(selectedOrder.updatedAt)}</span>
                  </div>
                )}
              </div>

              <div className="order-items-details">
                <h4>Order Items</h4>
                {selectedOrder.products.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <h6>{item.product?.name || `Product ${index + 1}`}</h6>
                      <p className="item-details">
                        Quantity: {item.quantity} | Price: {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="item-total">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total-details">
                <div className="total-row">
                  <span className="total-label">Total:</span>
                  <span className="total-value">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders; 