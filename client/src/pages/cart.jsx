import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaCreditCard,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaHeart,
  FaSpinner
} from 'react-icons/fa';
import './cart.css';
import { 
  getCart, 
  saveCart, 
  removeFromCart, 
  updateCartItemQuantity, 
  clearCart, 
  getCartTotal, 
  getCartItemCount 
} from '../utils/cartUtils';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  const loadCartFromStorage = () => {
    const cart = getCart();
    setCartItems(cart);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const success = updateCartItemQuantity(productId, newQuantity);
    if (success) {
      loadCartFromStorage(); // Reload cart to get updated state
    }
  };

  const handleRemoveItem = (productId) => {
    const success = removeFromCart(productId);
    if (success) {
      loadCartFromStorage(); // Reload cart to get updated state
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      const success = clearCart();
      if (success) {
        setCartItems([]);
      }
    }
  };

  const handleCheckout = () => {
    // For now, just show an alert. You can implement checkout logic later
    alert('Checkout functionality will be implemented soon!');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleAddToWishlist = (product) => {
    console.log('Add to wishlist:', product);
    alert(`${product.name} added to wishlist!`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-header">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
              <Link to="/products" className="btn btn-outline-secondary me-3">
                <FaArrowLeft /> Continue Shopping
              </Link>
              <div>
                <h1 className="mb-1">Your Cart</h1>
                <p className="text-muted mb-0">
                  {getCartItemCount()} item{getCartItemCount() !== 1 ? 's' : ''} in your cart
                </p>
              </div>
            </div>
            {cartItems.length > 0 && (
              <button 
                className="btn btn-outline-danger"
                onClick={handleClearCart}
              >
                <FaTrash className="me-2" />
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {/* Cart Content */}
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <FaShoppingCart className="empty-cart-icon mb-3" style={{ fontSize: '4rem', color: '#ccc' }} />
              <h3>Your Cart is Empty</h3>
              <p className="text-muted">Looks like you haven't added any items to your cart yet.</p>
              <button 
                className="btn btn-primary"
                onClick={handleContinueShopping}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="row">
              {/* Cart Items */}
              <div className="col-lg-8">
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.product._id} className="cart-item">
                      <div className="item-image">
                        <img 
                          src={item.product.image || 'https://via.placeholder.com/100x100?text=Product'} 
                          alt={item.product.name}
                          className="product-img"
                        />
                      </div>
                      
                      <div className="item-details">
                        <div className="item-info">
                          <h5 className="item-name">{item.product.name}</h5>
                          <p className="item-category">{item.product.category}</p>
                          <p className="item-price">{formatPrice(item.product.price)}</p>
                        </div>
                        
                        <div className="item-actions">
                          <div className="quantity-controls">
                            <button
                              className="quantity-btn"
                              onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <FaMinus />
                            </button>
                            <span className="quantity-display">
                              {item.quantity}
                            </span>
                            <button
                              className="quantity-btn"
                              onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                            >
                              <FaPlus />
                            </button>
                          </div>
                          
                          <div className="item-total">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                          
                          <div className="item-buttons">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleRemoveItem(item.product._id)}
                            >
                              <FaTrash />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleAddToWishlist(item.product)}
                            >
                              <FaHeart />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="col-lg-4">
                <div className="cart-summary">
                  <h4>Order Summary</h4>
                  
                  <div className="summary-item">
                    <span>Subtotal ({getCartItemCount()} items):</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                  
                  <div className="summary-item">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  
                  <div className="summary-item">
                    <span>Tax:</span>
                    <span>{formatPrice(getCartTotal() * 0.08)}</span>
                  </div>
                  
                  <hr />
                  
                  <div className="summary-total">
                    <span>Total:</span>
                    <span>{formatPrice(getCartTotal() * 1.08)}</span>
                  </div>
                  
                  <button 
                    className="btn btn-primary btn-lg w-100 mb-3"
                    onClick={handleCheckout}
                  >
                    <FaCreditCard className="me-2" />
                    Proceed to Checkout
                  </button>
                  
                  <div className="cart-features">
                    <div className="feature-item">
                      <FaTruck className="feature-icon" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="feature-item">
                      <FaShieldAlt className="feature-icon" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="feature-item">
                      <FaUndo className="feature-icon" />
                      <span>30-day return policy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 