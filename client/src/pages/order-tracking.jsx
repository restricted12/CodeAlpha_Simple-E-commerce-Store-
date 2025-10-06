import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCreditCard,
  FaBox,
  FaSpinner,
  FaArrowLeft,
  FaPrint,
  FaDownload
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './order-tracking.css';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, getOrderById } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchOrderId, setSearchOrderId] = useState(orderId || '');

  // Order status configuration
  const orderStatuses = {
    pending: {
      label: 'Order Pending',
      icon: FaClock,
      color: '#ffc107',
      description: 'Your order is being processed'
    },
    confirmed: {
      label: 'Order Confirmed',
      icon: FaCheckCircle,
      color: '#17a2b8',
      description: 'Your order has been confirmed'
    },
    processing: {
      label: 'Processing',
      icon: FaBox,
      color: '#007bff',
      description: 'Your order is being prepared'
    },
    shipped: {
      label: 'Shipped',
      icon: FaTruck,
      color: '#28a745',
      description: 'Your order is on its way'
    },
    delivered: {
      label: 'Delivered',
      icon: FaCheckCircle,
      color: '#28a745',
      description: 'Your order has been delivered'
    },
    cancelled: {
      label: 'Cancelled',
      icon: FaTimesCircle,
      color: '#dc3545',
      description: 'Your order has been cancelled'
    }
  };

  // Load order data
  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  const fetchOrder = async (id) => {
    if (!id.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const orderData = await getOrderById(id);
      setOrder(orderData);
    } catch (err) {
      setError('Order not found. Please check your order ID.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchOrderId.trim()) {
      navigate(`/order-tracking/${searchOrderId}`);
    }
  };

  const getStatusIcon = (status) => {
    const statusConfig = orderStatuses[status] || orderStatuses.pending;
    const IconComponent = statusConfig.icon;
    return <IconComponent style={{ color: statusConfig.color }} />;
  };

  const getStatusColor = (status) => {
    return orderStatuses[status]?.color || '#6c757d';
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedDelivery = (orderDate, status) => {
    if (status === 'delivered') return 'Delivered';
    
    const orderDateObj = new Date(orderDate);
    const estimatedDate = new Date(orderDateObj);
    
    switch (status) {
      case 'pending':
      case 'confirmed':
        estimatedDate.setDate(estimatedDate.getDate() + 3);
        break;
      case 'processing':
        estimatedDate.setDate(estimatedDate.getDate() + 2);
        break;
      case 'shipped':
        estimatedDate.setDate(estimatedDate.getDate() + 1);
        break;
      default:
        estimatedDate.setDate(estimatedDate.getDate() + 3);
    }
    
    return estimatedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handlePrintOrder = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    // This would typically generate and download a PDF invoice
    alert('Invoice download feature will be implemented soon!');
  };

  if (!isAuthenticated && !orderId) {
    return (
      <div className="order-tracking-page">
        <div className="container">
          <div className="tracking-header">
            <h1>Track Your Order</h1>
            <p>Enter your order ID to track your package</p>
          </div>

          <div className="search-section">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <input
                  type="text"
                  placeholder="Enter your order ID (e.g., #12345)"
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>

          <div className="tracking-info">
            <h3>How to track your order:</h3>
            <ul>
              <li>Enter your order ID in the search box above</li>
              <li>Your order ID was sent to your email after purchase</li>
              <li>You can also find it in your account orders section</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-tracking-page">
      <div className="container">
        {/* Header */}
        <div className="tracking-header">
          <button 
            className="btn btn-outline-secondary mb-3"
            onClick={() => navigate('/orders')}
          >
            <FaArrowLeft /> Back to Orders
          </button>
          <h1>Order Tracking</h1>
          <p>Track your order status and delivery information</p>
        </div>

        {/* Search Form */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Enter order ID to search"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <FaSearch />
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <FaSpinner className="spinning" />
            <p>Loading order details...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <FaTimesCircle />
            <h3>Order Not Found</h3>
            <p>{error}</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/orders')}
            >
              View My Orders
            </button>
          </div>
        )}

        {/* Order Details */}
        {order && !loading && (
          <div className="order-details">
            {/* Order Header */}
            <div className="order-header">
              <div className="order-info">
                <h2>Order #{order._id}</h2>
                <p className="order-date">Placed on {formatDate(order.createdAt)}</p>
                <p className="estimated-delivery">
                  Estimated Delivery: {getEstimatedDelivery(order.createdAt, order.status)}
                </p>
              </div>
              <div className="order-actions">
                <button className="btn btn-outline-secondary" onClick={handlePrintOrder}>
                  <FaPrint /> Print
                </button>
                <button className="btn btn-outline-primary" onClick={handleDownloadInvoice}>
                  <FaDownload /> Invoice
                </button>
              </div>
            </div>

            {/* Order Status */}
            <div className="order-status-section">
              <h3>Order Status</h3>
              <div className="status-card">
                <div className="status-icon">
                  {getStatusIcon(order.status)}
                </div>
                <div className="status-info">
                  <h4 style={{ color: getStatusColor(order.status) }}>
                    {orderStatuses[order.status]?.label || 'Unknown Status'}
                  </h4>
                  <p>{orderStatuses[order.status]?.description || 'Status information not available'}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="order-items-section">
              <h3>Order Items</h3>
              <div className="items-list">
                {order.items?.map((item, index) => (
                  <div key={index} className="order-item">
                    <img 
                      src={item.image || 'https://via.placeholder.com/80x80?text=Product'} 
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h5>{item.name}</h5>
                      <p>Quantity: {item.quantity}</p>
                      <p className="item-price">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary-section">
              <h3>Order Summary</h3>
              <div className="summary-card">
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

            {/* Shipping Information */}
            <div className="shipping-section">
              <h3>Shipping Information</h3>
              <div className="shipping-card">
                <div className="shipping-address">
                  <h4>
                    <FaMapMarkerAlt className="me-2" />
                    Delivery Address
                  </h4>
                  <p>
                    {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}<br />
                    {order.shippingAddress?.address}<br />
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}<br />
                    {order.shippingAddress?.country}
                  </p>
                </div>
                <div className="contact-info">
                  <h4>
                    <FaPhone className="me-2" />
                    Contact Information
                  </h4>
                  <p>
                    <FaEnvelope className="me-2" />
                    {order.customer?.email}<br />
                    <FaPhone className="me-2" />
                    {order.customer?.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="payment-section">
              <h3>Payment Information</h3>
              <div className="payment-card">
                <div className="payment-method">
                  <h4>
                    <FaCreditCard className="me-2" />
                    Payment Method
                  </h4>
                  <p>
                    {order.paymentMethod?.replace('_', ' ').toUpperCase()}<br />
                    Status: <span className={`payment-status ${order.paymentStatus}`}>
                      {order.paymentStatus?.toUpperCase()}
                    </span>
                  </p>
                </div>
                {order.notes && (
                  <div className="order-notes">
                    <h4>Order Notes</h4>
                    <p>{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
