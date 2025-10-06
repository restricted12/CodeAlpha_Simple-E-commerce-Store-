import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCreditCard,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaCheck,
  FaSpinner,
  FaTruck,
  FaShieldAlt
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { 
  getCart, 
  getCartTotal, 
  getCartItemCount,
  clearCart 
} from '../utils/cartUtils';
import './checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, createOrder } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Billing Information
    billingSameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'United States',
    
    // Payment Information
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Order Notes
    orderNotes: ''
  });

  // Load cart items and user data
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    const cart = getCart();
    setCartItems(cart);

    // Pre-fill form with user data if available
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-fill billing address if checkbox is checked
    if (name === 'billingSameAsShipping' && checked) {
      setFormData(prev => ({
        ...prev,
        billingFirstName: prev.firstName,
        billingLastName: prev.lastName,
        billingAddress: prev.address,
        billingCity: prev.city,
        billingState: prev.state,
        billingZipCode: prev.zipCode,
        billingCountry: prev.country
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 
      'city', 'state', 'zipCode'
    ];

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    if (formData.paymentMethod === 'credit_card') {
      const paymentFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
      for (const field of paymentFields) {
        if (!formData[field].trim()) {
          alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        // Customer Information
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        
        // Shipping Address
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        
        // Billing Address
        billingAddress: formData.billingSameAsShipping ? {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        } : {
          firstName: formData.billingFirstName,
          lastName: formData.billingLastName,
          address: formData.billingAddress,
          city: formData.billingCity,
          state: formData.billingState,
          zipCode: formData.billingZipCode,
          country: formData.billingCountry
        },
        
        // Order Items
        items: cartItems.map(item => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        })),
        
        // Order Summary
        subtotal: getCartTotal(),
        tax: getCartTotal() * 0.08,
        shipping: getCartTotal() > 50 ? 0 : 9.99,
        total: getCartTotal() * 1.08 + (getCartTotal() > 50 ? 0 : 9.99),
        
        // Payment Information
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'pending',
        
        // Order Status
        status: 'pending',
        
        // Additional Information
        notes: formData.orderNotes
      };

      const response = await createOrder(orderData);
      
      if (response && response._id) {
        setOrderId(response._id);
        setOrderPlaced(true);
        clearCart();
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h1>Order Placed Successfully!</h1>
            <p className="order-id">Order ID: #{orderId}</p>
            <p>Thank you for your purchase! You will receive a confirmation email shortly.</p>
            
            <div className="success-actions">
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/orders')}
              >
                View Order Details
              </button>
              <button 
                className="btn btn-outline-secondary"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h1>Your Cart is Empty</h1>
            <p>Add some items to your cart before checking out.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Header */}
        <div className="checkout-header">
          <button 
            className="btn btn-outline-secondary mb-3"
            onClick={() => navigate('/cart')}
          >
            <FaArrowLeft /> Back to Cart
          </button>
          <h1>Checkout</h1>
          <p className="text-muted">Complete your order securely</p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="row">
            {/* Left Column - Forms */}
            <div className="col-lg-8">
              {/* Shipping Information */}
              <div className="checkout-section">
                <h3>
                  <FaUser className="me-2" />
                  Shipping Information
                </h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Information */}
              <div className="checkout-section">
                <h3>
                  <FaCreditCard className="me-2" />
                  Billing Information
                </h3>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="billingSameAsShipping"
                      checked={formData.billingSameAsShipping}
                      onChange={handleInputChange}
                    />
                    Billing address same as shipping address
                  </label>
                </div>

                {!formData.billingSameAsShipping && (
                  <div className="billing-form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name *</label>
                          <input
                            type="text"
                            name="billingFirstName"
                            value={formData.billingFirstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name *</label>
                          <input
                            type="text"
                            name="billingLastName"
                            value={formData.billingLastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Address *</label>
                      <input
                        type="text"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>City *</label>
                          <input
                            type="text"
                            name="billingCity"
                            value={formData.billingCity}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>State *</label>
                          <input
                            type="text"
                            name="billingState"
                            value={formData.billingState}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>ZIP Code *</label>
                          <input
                            type="text"
                            name="billingZipCode"
                            value={formData.billingZipCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Information */}
              <div className="checkout-section">
                <h3>
                  <FaLock className="me-2" />
                  Payment Information
                </h3>
                
                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash_on_delivery">Cash on Delivery</option>
                  </select>
                </div>

                {formData.paymentMethod !== 'cash_on_delivery' && (
                  <div className="payment-form">
                    <div className="form-group">
                      <label>Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Expiry Date *</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>CVV *</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Notes */}
              <div className="checkout-section">
                <h3>Order Notes</h3>
                <div className="form-group">
                  <label>Special Instructions (Optional)</label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any special instructions for your order..."
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="col-lg-4">
              <div className="order-summary">
                <h3>Order Summary</h3>
                
                <div className="order-items">
                  {cartItems.map((item) => (
                    <div key={item.product._id} className="order-item">
                      <img 
                        src={item.product.image || 'https://via.placeholder.com/60x60?text=Product'} 
                        alt={item.product.name}
                        className="item-image"
                      />
                      <div className="item-details">
                        <h6>{item.product.name}</h6>
                        <p>Qty: {item.quantity}</p>
                        <p className="item-price">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-totals">
                  <div className="total-row">
                    <span>Subtotal ({getCartItemCount()} items):</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping:</span>
                    <span>{getCartTotal() > 50 ? 'Free' : formatPrice(9.99)}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax:</span>
                    <span>{formatPrice(getCartTotal() * 0.08)}</span>
                  </div>
                  <hr />
                  <div className="total-row total">
                    <span>Total:</span>
                    <span>{formatPrice(getCartTotal() * 1.08 + (getCartTotal() > 50 ? 0 : 9.99))}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="spinning me-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCreditCard className="me-2" />
                      Place Order
                    </>
                  )}
                </button>

                <div className="security-features">
                  <div className="security-item">
                    <FaShieldAlt className="me-2" />
                    <span>Secure SSL Encryption</span>
                  </div>
                  <div className="security-item">
                    <FaTruck className="me-2" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
