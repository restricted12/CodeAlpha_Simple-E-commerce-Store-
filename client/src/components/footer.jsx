import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin
} from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">CodeAlpha Store</h3>
            <p className="footer-description">
              Your one-stop destination for quality products. We bring you the best deals 
              on electronics, fashion, home goods, and more.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/products" className="footer-link">Products</Link></li>
              <li><Link to="/categories" className="footer-link">Categories</Link></li>
              <li><Link to="/deals" className="footer-link">Deals</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Customer Service</h4>
            <ul className="footer-links">
              <li><Link to="/help" className="footer-link">Help Center</Link></li>
              <li><Link to="/shipping" className="footer-link">Shipping Info</Link></li>
              <li><Link to="/returns" className="footer-link">Returns & Exchanges</Link></li>
              <li><Link to="/size-guide" className="footer-link">Size Guide</Link></li>
              <li><Link to="/track-order" className="footer-link">Track Order</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Account</h4>
            <ul className="footer-links">
              <li><Link to="/login" className="footer-link">Sign In</Link></li>
              <li><Link to="/register" className="footer-link">Create Account</Link></li>
              <li><Link to="/profile" className="footer-link">My Profile</Link></li>
              <li><Link to="/orders" className="footer-link">Order History</Link></li>
              <li><Link to="/wishlist" className="footer-link">Wishlist</Link></li>
              <li><Link to="/settings" className="footer-link">Settings</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Stay Updated</h4>
            <p className="newsletter-text">
              Subscribe to our newsletter for the latest products and exclusive offers.
            </p>
            <form className="newsletter-form">
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  <FiSend size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {currentYear} CodeAlpha Store. All rights reserved.</p>
            </div>
            <div className="footer-legal">
              <Link to="/privacy" className="footer-legal-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-legal-link">Terms of Service</Link>
              <Link to="/cookies" className="footer-legal-link">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
