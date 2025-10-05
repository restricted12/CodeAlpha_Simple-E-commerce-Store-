import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiUser, FiLogIn, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { getCartItemCount } from '../utils/cartUtils';
import './header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setCartItemCount(getCartItemCount());
    
    const handleCartUpdate = () => {
      setCartItemCount(getCartItemCount());
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-text">STore</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/new-products" 
                className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/categories" 
                className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}
              >
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/deals" 
                className={`nav-link ${location.pathname === '/deals' ? 'active' : ''}`}
              >
                Deals
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/contact" 
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          {/* Cart */}
          <Link to="/cart" className="cart-link">
            <FiShoppingCart className="cart-icon" />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>

          {/* User Actions */}
          {isAuthenticated ? (
            <div className="user-actions">
              <Link to="/profile" className="user-link">
                <FiUser className="user-icon" />
                <span className="user-name">{user?.firstName || 'User'}</span>
              </Link>
              <Link to="/orders" className="orders-link">
                Orders
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut className="logout-icon" />
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-actions">
              <Link to="/login" className="login-btn">
                <FiLogIn className="login-icon" />
                Login
              </Link>
              <Link to="/register" className="register-btn">
                <FiUser className="register-icon" />
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-content">
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <Link 
                to="/" 
                className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link 
                to="/new-products" 
                className={`mobile-nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link 
                to="/categories" 
                className={`mobile-nav-link ${location.pathname === '/categories' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Categories
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link 
                to="/deals" 
                className={`mobile-nav-link ${location.pathname === '/deals' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Deals
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link 
                to="/about" 
                className={`mobile-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link 
                to="/contact" 
                className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile User Actions */}
          <div className="mobile-user-actions">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="mobile-user-link" onClick={closeMobileMenu}>
                  <FiUser />
                  Profile
                </Link>
                <Link to="/orders" className="mobile-user-link" onClick={closeMobileMenu}>
                  Orders
                </Link>
                <button onClick={handleLogout} className="mobile-logout-btn">
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-login-btn" onClick={closeMobileMenu}>
                  <FiLogIn />
                  Login
                </Link>
                <Link to="/register" className="mobile-register-btn" onClick={closeMobileMenu}>
                  <FiUser />
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}
    </header>
  );
};

export default Header;