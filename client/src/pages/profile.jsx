import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaEye,
  FaTrash,
  FaDownload,
  FaCreditCard,
  FaShieldAlt,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaLock
} from 'react-icons/fa';
import '../App.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState(null);

  // Sample user data
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  // Sample orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 89.99,
      items: [
        { name: 'Wireless Bluetooth Headphones', quantity: 1, price: 89.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 156.98,
      items: [
        { name: 'Premium Cotton T-Shirt', quantity: 2, price: 24.99 },
        { name: 'Smart LED Desk Lamp', quantity: 1, price: 45.99 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 32.99,
      items: [
        { name: 'Professional Yoga Mat', quantity: 1, price: 32.99 }
      ]
    }
  ];

  // Sample wishlist data
  const wishlist = [
    {
      id: 1,
      name: 'Premium Wireless Earbuds',
      price: 129.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop',
      rating: 4.6,
      reviews: 89
    },
    {
      id: 2,
      name: 'Designer Leather Wallet',
      price: 45.99,
      originalPrice: 65.99,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop',
      rating: 4.3,
      reviews: 156
    },
    {
      id: 3,
      name: 'Smart Fitness Watch',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      rating: 4.7,
      reviews: 234
    }
  ];

  const handleEdit = (field) => {
    setEditField(field);
    setIsEditing(true);
  };

  const handleSave = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsEditing(false);
    setEditField(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditField(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'primary';
      case 'processing':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="row">
          {/* Profile Sidebar */}
          <div className="col-lg-3">
            <div className="profile-sidebar">
              <div className="profile-header">
                <div className="profile-avatar">
                  <img src={userData.avatar} alt="Profile" />
                  <button className="edit-avatar-btn">
                    <FaEdit />
                  </button>
                </div>
                <h3 className="profile-name">{userData.firstName} {userData.lastName}</h3>
                <p className="profile-email">{userData.email}</p>
              </div>

              <nav className="profile-nav">
                <button
                  className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FaUser /> Profile
                </button>
                <button
                  className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <FaShoppingBag /> Orders
                </button>
                <button
                  className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <FaHeart /> Wishlist
                </button>
                <button
                  className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <FaCog /> Settings
                </button>
                <button
                  className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <FaShieldAlt /> Security
                </button>
              </nav>

              <div className="profile-actions">
                <button className="logout-btn">
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="col-lg-9">
            <div className="profile-content">
              {/* Profile Information Tab */}
              {activeTab === 'profile' && (
                <div className="profile-tab">
                  <div className="tab-header">
                    <h2>Profile Information</h2>
                    <p>Manage your personal information and preferences</p>
                  </div>

                  <div className="profile-form">
                    <div className="form-group">
                      <label>
                        <FaUser /> First Name
                      </label>
                      {editField === 'firstName' ? (
                        <div className="edit-field">
                          <input
                            type="text"
                            value={userData.firstName}
                            onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                          />
                          <button onClick={() => handleSave('firstName', userData.firstName)}>
                            <FaSave />
                          </button>
                          <button onClick={handleCancel}>
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="field-display">
                          <span>{userData.firstName}</span>
                          <button onClick={() => handleEdit('firstName')}>
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        <FaUser /> Last Name
                      </label>
                      {editField === 'lastName' ? (
                        <div className="edit-field">
                          <input
                            type="text"
                            value={userData.lastName}
                            onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                          />
                          <button onClick={() => handleSave('lastName', userData.lastName)}>
                            <FaSave />
                          </button>
                          <button onClick={handleCancel}>
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="field-display">
                          <span>{userData.lastName}</span>
                          <button onClick={() => handleEdit('lastName')}>
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        <FaEnvelope /> Email
                      </label>
                      <div className="field-display">
                        <span>{userData.email}</span>
                        <span className="verified-badge">Verified</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        <FaPhone /> Phone
                      </label>
                      {editField === 'phone' ? (
                        <div className="edit-field">
                          <input
                            type="tel"
                            value={userData.phone}
                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                          <button onClick={() => handleSave('phone', userData.phone)}>
                            <FaSave />
                          </button>
                          <button onClick={handleCancel}>
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="field-display">
                          <span>{userData.phone}</span>
                          <button onClick={() => handleEdit('phone')}>
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        <FaMapMarkerAlt /> Address
                      </label>
                      {editField === 'address' ? (
                        <div className="edit-field">
                          <textarea
                            value={userData.address}
                            onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
                          />
                          <button onClick={() => handleSave('address', userData.address)}>
                            <FaSave />
                          </button>
                          <button onClick={handleCancel}>
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="field-display">
                          <span>{userData.address}</span>
                          <button onClick={() => handleEdit('address')}>
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="orders-tab">
                  <div className="tab-header">
                    <h2>Order History</h2>
                    <p>Track your orders and view order details</p>
                  </div>

                  <div className="orders-list">
                    {orders.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div className="order-info">
                            <h4>Order #{order.id}</h4>
                            <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="order-status">
                            <span className={`status-badge ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="order-items">
                          {order.items.map((item, index) => (
                            <div key={index} className="order-item">
                              <span>{item.name} x{item.quantity}</span>
                              <span>${item.price}</span>
                            </div>
                          ))}
                        </div>
                        <div className="order-footer">
                          <div className="order-total">
                            <strong>Total: ${order.total}</strong>
                          </div>
                          <div className="order-actions">
                            <button className="btn btn-outline-primary btn-sm">
                              <FaEye /> View Details
                            </button>
                            <button className="btn btn-outline-secondary btn-sm">
                              <FaDownload /> Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="wishlist-tab">
                  <div className="tab-header">
                    <h2>My Wishlist</h2>
                    <p>Save items you love for later</p>
                  </div>

                  <div className="wishlist-grid">
                    {wishlist.map(item => (
                      <div key={item.id} className="wishlist-item">
                        <div className="item-image">
                          <img src={item.image} alt={item.name} />
                          <button className="remove-btn">
                            <FaTrash />
                          </button>
                        </div>
                        <div className="item-info">
                          <h4>{item.name}</h4>
                          <div className="item-rating">
                            <div className="stars">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={i < Math.floor(item.rating) ? 'star filled' : 'star'}
                                />
                              ))}
                            </div>
                            <span>({item.reviews})</span>
                          </div>
                          <div className="item-price">
                            <span className="current-price">${item.price}</span>
                            <span className="original-price">${item.originalPrice}</span>
                          </div>
                          <div className="item-actions">
                            <button className="btn btn-primary btn-sm">
                              <FaShoppingBag /> Add to Cart
                            </button>
                            <button className="btn btn-outline-primary btn-sm">
                              <FaEye /> Quick View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="settings-tab">
                  <div className="tab-header">
                    <h2>Account Settings</h2>
                    <p>Customize your account preferences</p>
                  </div>

                  <div className="settings-list">
                    <div className="setting-item">
                      <div className="setting-info">
                        <h4>Email Notifications</h4>
                        <p>Receive updates about orders and promotions</p>
                      </div>
                      <div className="setting-control">
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <h4>SMS Notifications</h4>
                        <p>Get order updates via text message</p>
                      </div>
                      <div className="setting-control">
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <h4>Marketing Communications</h4>
                        <p>Receive promotional emails and offers</p>
                      </div>
                      <div className="setting-control">
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="security-tab">
                  <div className="tab-header">
                    <h2>Security Settings</h2>
                    <p>Manage your account security and privacy</p>
                  </div>

                  <div className="security-options">
                    <div className="security-item">
                      <div className="security-icon">
                        <FaLock />
                      </div>
                      <div className="security-info">
                        <h4>Change Password</h4>
                        <p>Update your account password</p>
                      </div>
                      <button className="btn btn-outline-primary">Change</button>
                    </div>

                    <div className="security-item">
                      <div className="security-icon">
                        <FaCreditCard />
                      </div>
                      <div className="security-info">
                        <h4>Payment Methods</h4>
                        <p>Manage your saved payment methods</p>
                      </div>
                      <button className="btn btn-outline-primary">Manage</button>
                    </div>

                    <div className="security-item">
                      <div className="security-icon">
                        <FaBell />
                      </div>
                      <div className="security-info">
                        <h4>Login Alerts</h4>
                        <p>Get notified of new login attempts</p>
                      </div>
                      <button className="btn btn-outline-primary">Enable</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
