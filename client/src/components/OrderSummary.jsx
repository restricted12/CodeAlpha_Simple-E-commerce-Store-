import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaShoppingBag, FaClock, FaTruck, FaCheckCircle } from 'react-icons/fa';
import './OrderSummary.css';

const OrderSummary = ({ showDetails = false }) => {
  const { orders, getOrderStatistics } = useAuth();

  const stats = getOrderStatistics();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getTotalSpent = () => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  const getRecentOrders = (limit = 3) => {
    return orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  };

  if (orders.length === 0) {
    return (
      <div className="order-summary-widget">
        <div className="text-center py-4">
          <FaShoppingBag className="text-muted mb-2" style={{ fontSize: '2rem' }} />
          <h6>No Orders Yet</h6>
          <p className="text-muted small">Start shopping to see your order summary</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-widget">
      <div className="summary-header">
        <h5 className="mb-3">
          <FaShoppingBag className="me-2" />
          Order Summary
        </h5>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats mb-3">
        <div className="row g-2">
          <div className="col-6">
            <div className="stat-item">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>
          <div className="col-6">
            <div className="stat-item">
              <div className="stat-number">{formatPrice(getTotalSpent())}</div>
              <div className="stat-label">Total Spent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="status-breakdown mb-3">
        <h6 className="mb-2">Order Status</h6>
        <div className="status-items">
          {stats.pending > 0 && (
            <div className="status-item">
              <FaClock className="status-icon pending" />
              <span className="status-label">Pending</span>
              <span className="status-count">{stats.pending}</span>
            </div>
          )}
          {stats.processing > 0 && (
            <div className="status-item">
              <FaClock className="status-icon processing" />
              <span className="status-label">Processing</span>
              <span className="status-count">{stats.processing}</span>
            </div>
          )}
          {stats.shipped > 0 && (
            <div className="status-item">
              <FaTruck className="status-icon shipped" />
              <span className="status-label">Shipped</span>
              <span className="status-count">{stats.shipped}</span>
            </div>
          )}
          {stats.delivered > 0 && (
            <div className="status-item">
              <FaCheckCircle className="status-icon delivered" />
              <span className="status-label">Delivered</span>
              <span className="status-count">{stats.delivered}</span>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      {showDetails && (
        <div className="recent-orders">
          <h6 className="mb-2">Recent Orders</h6>
          <div className="recent-orders-list">
            {getRecentOrders().map((order) => (
              <div key={order._id} className="recent-order-item">
                <div className="order-info">
                  <div className="order-id">#{order._id.slice(-6).toUpperCase()}</div>
                  <div className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="order-details">
                  <div className="order-total">{formatPrice(order.total)}</div>
                  <div className={`order-status status-${order.status}`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary; 