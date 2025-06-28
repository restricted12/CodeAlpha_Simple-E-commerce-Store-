import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiMenu, FiUser, FiLogIn } from 'react-icons/fi';
import './header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Profile Section - Left Side */}
        <div className="profile-section">
          <Link to="/profile" className="profile-link">
            <div className="profile-avatar">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
                alt="Profile" 
                className="avatar-img"
              />
              <div className="profile-status"></div>
            </div>
            <div className="profile-info">
              <span className="profile-name">Welcome</span>
              <span className="profile-subtitle">Sign in / Register</span>
            </div>
          </Link>
        </div>

        {/* Logo - Center */}
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <img src="/logo.svg" alt="CodeAlpha Store" className="logo-image" />
          </Link>
        </div>

        {/* Navigation - Right Side */}
        <nav className={`nav-section ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/products_detail" 
                className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/categories" 
                className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/deals" 
                className={`nav-link ${location.pathname === '/deals' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Deals
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/contact" 
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn search-btn" aria-label="Search">
            <FiSearch size={20} />
          </button>
          <Link to="/cart" className="action-btn cart-btn" aria-label="Cart">
            <FiShoppingCart size={20} />
            <span className="cart-count">0</span>
          </Link>
          <Link to="/login" className="action-btn auth-btn" aria-label="Login">
            <FiLogIn size={20} />
          </Link>
          <Link to="/register" className="action-btn auth-btn register-btn" aria-label="Register">
            <FiUser size={20} />
          </Link>
          <button className="action-btn mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Menu">
            <FiMenu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
