import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminAnalytics.css';

const AdminAnalytics = () => {
  const { 
    products, 
    orders, 
    fetchProducts, 
    fetchOrders,
    getOrderStatistics 
  } = useAuth();
  
  const [timeRange, setTimeRange] = useState('30');
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    sales: {
      total: 0,
      growth: 0,
      chart: []
    },
    orders: {
      total: 0,
      growth: 0,
      chart: []
    },
    products: {
      total: 0,
      topSelling: [],
      lowStock: []
    },
    customers: {
      total: 0,
      newCustomers: 0,
      chart: []
    }
  });

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchOrders()]);
      
      // Calculate analytics based on current data
      const orderStats = getOrderStatistics();
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      const lowStockProducts = products.filter(product => product.stock < 10);
      
      // Mock chart data (in a real app, this would come from the API)
      const chartData = generateChartData(parseInt(timeRange));
      
      setAnalytics({
        sales: {
          total: totalRevenue,
          growth: 12.5, // Mock growth percentage
          chart: chartData.sales
        },
        orders: {
          total: orders.length,
          growth: 8.3, // Mock growth percentage
          chart: chartData.orders
        },
        products: {
          total: products.length,
          topSelling: getTopSellingProducts(),
          lowStock: lowStockProducts.slice(0, 5)
        },
        customers: {
          total: 1, // Mock data
          newCustomers: 0, // Mock data
          chart: chartData.customers
        }
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateChartData = (days) => {
    const data = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.floor(Math.random() * 1000) + 500 // Mock data
      });
    }
    
    return {
      sales: data.map(d => ({ ...d, value: d.value * 10 })),
      orders: data.map(d => ({ ...d, value: Math.floor(d.value / 10) })),
      customers: data.map(d => ({ ...d, value: Math.floor(d.value / 20) }))
    };
  };

  const getTopSellingProducts = () => {
    // Mock top selling products (in a real app, this would be calculated from order data)
    return products
      .sort((a, b) => Math.random() - 0.5) // Random sort for demo
      .slice(0, 5)
      .map(product => ({
        ...product,
        sales: Math.floor(Math.random() * 100) + 10
      }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getGrowthColor = (growth) => {
    return growth >= 0 ? '#10b981' : '#ef4444';
  };

  const getGrowthIcon = (growth) => {
    return growth >= 0 ? '📈' : '📉';
  };

  if (loading) {
    return (
      <div className="admin-analytics">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="header-content">
          <h1>Analytics & Reports</h1>
          <p>Track your store's performance and insights</p>
        </div>
        
        <div className="time-range-selector">
          <label htmlFor="timeRange">Time Range:</label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <h3>Total Sales</h3>
            <span className="metric-icon">💰</span>
          </div>
          <div className="metric-value">{formatCurrency(analytics.sales.total)}</div>
          <div className="metric-growth" style={{ color: getGrowthColor(analytics.sales.growth) }}>
            <span>{getGrowthIcon(analytics.sales.growth)}</span>
            {Math.abs(analytics.sales.growth)}% from last period
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>Total Orders</h3>
            <span className="metric-icon">📋</span>
          </div>
          <div className="metric-value">{formatNumber(analytics.orders.total)}</div>
          <div className="metric-growth" style={{ color: getGrowthColor(analytics.orders.growth) }}>
            <span>{getGrowthIcon(analytics.orders.growth)}</span>
            {Math.abs(analytics.orders.growth)}% from last period
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>Total Products</h3>
            <span className="metric-icon">📦</span>
          </div>
          <div className="metric-value">{formatNumber(analytics.products.total)}</div>
          <div className="metric-subtitle">Active products in catalog</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>Total Customers</h3>
            <span className="metric-icon">👥</span>
          </div>
          <div className="metric-value">{formatNumber(analytics.customers.total)}</div>
          <div className="metric-subtitle">Registered users</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-header">
            <h3>Sales Trend</h3>
            <p>Revenue over the selected period</p>
          </div>
          <div className="chart-placeholder">
            <div className="chart-mock">
              <div className="chart-bars">
                {analytics.sales.chart.slice(-7).map((point, index) => (
                  <div
                    key={index}
                    className="chart-bar"
                    style={{ 
                      height: `${(point.value / Math.max(...analytics.sales.chart.map(p => p.value))) * 100}%` 
                    }}
                  />
                ))}
              </div>
              <div className="chart-labels">
                {analytics.sales.chart.slice(-7).map((point, index) => (
                  <span key={index} className="chart-label">
                    {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3>Orders Trend</h3>
            <p>Number of orders over time</p>
          </div>
          <div className="chart-placeholder">
            <div className="chart-mock">
              <div className="chart-bars">
                {analytics.orders.chart.slice(-7).map((point, index) => (
                  <div
                    key={index}
                    className="chart-bar"
                    style={{ 
                      height: `${(point.value / Math.max(...analytics.orders.chart.map(p => p.value))) * 100}%` 
                    }}
                  />
                ))}
              </div>
              <div className="chart-labels">
                {analytics.orders.chart.slice(-7).map((point, index) => (
                  <span key={index} className="chart-label">
                    {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div className="data-section">
        <div className="data-container">
          <div className="data-header">
            <h3>Top Selling Products</h3>
            <p>Best performing products by sales</p>
          </div>
          <div className="data-table">
            {analytics.products.topSelling.map((product, index) => (
              <div key={product._id} className="data-row">
                <div className="rank">#{index + 1}</div>
                <div className="product-info">
                  <div className="product-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className="no-image">📦</div>
                    )}
                  </div>
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p>{product.category}</p>
                  </div>
                </div>
                <div className="sales-count">{product.sales} sales</div>
                <div className="revenue">{formatCurrency(product.price * product.sales)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="data-container">
          <div className="data-header">
            <h3>Low Stock Alert</h3>
            <p>Products that need restocking</p>
          </div>
          <div className="data-table">
            {analytics.products.lowStock.length > 0 ? (
              analytics.products.lowStock.map((product) => (
                <div key={product._id} className="data-row warning">
                  <div className="product-info">
                    <div className="product-image">
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <div className="no-image">📦</div>
                      )}
                    </div>
                    <div className="product-details">
                      <h4>{product.name}</h4>
                      <p>{product.category}</p>
                    </div>
                  </div>
                  <div className="stock-count low">{product.stock} left</div>
                  <div className="action">
                    <button className="restock-btn">Restock</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>All products are well stocked! 🎉</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="export-section">
        <div className="export-card">
          <h3>Export Reports</h3>
          <p>Download detailed reports for your records</p>
          <div className="export-buttons">
            <button className="export-btn">
              📊 Export Sales Report
            </button>
            <button className="export-btn">
              📋 Export Orders Report
            </button>
            <button className="export-btn">
              📦 Export Inventory Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
