import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaCheckCircle,
  FaExclamationCircle,
  FaUser,
  FaShieldAlt,
  FaStar
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import '../App.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className="login-page">
      {/* Background Elements */}
      <div className="bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Left Side - Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-5">
            <div className="login-form-container w-100" style={{ maxWidth: '450px' }}>
              <div className="text-center mb-5">
                <Link to="/" className="text-decoration-none">
                  <h1 className="brand-title mb-3">CodeAlpha Store</h1>
                </Link>
                <h2 className="form-title mb-3">Welcome Back</h2>
                <p className="form-subtitle">Sign in to your account to continue</p>
              </div>

              {submitStatus === 'success' && (
                <div className="success-alert">
                  <FaCheckCircle className="success-icon" />
                  <div>
                    <h4>Login Successful!</h4>
                    <p>Redirecting to home page...</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="modern-form" noValidate>
                {/* Email Field */}
                <div className="form-field-container">
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FaEnvelope />
                    </div>
                    <div className="input-content">
                      <label htmlFor="email" className="floating-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className={`floating-input ${errors.email ? 'error' : ''} ${formData.email ? 'has-value' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder=" "
                      />
                    </div>
                  </div>
                  {errors.email && (
                    <div className="error-message">
                      <FaExclamationCircle /> {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-field-container">
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FaLock />
                    </div>
                    <div className="input-content">
                      <label htmlFor="password" className="floating-label">
                        Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={`floating-input ${errors.password ? 'error' : ''} ${formData.password ? 'has-value' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder=" "
                      />
                    </div>
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="error-message">
                      <FaExclamationCircle /> {errors.password}
                    </div>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="form-options">
                  <div className="checkbox-container">
                    <label className="custom-checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="custom-checkbox"
                      />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">Remember me</span>
                    </label>
                  </div>
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <div className="form-submit">
                  <button
                    type="submit"
                    className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <FiArrowRight className="btn-icon" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Social Login */}
              <div className="social-login-section">
                <div className="divider">
                  <span>or continue with</span>
                </div>
                <div className="social-buttons">
                  <button
                    className="social-btn google-btn"
                    onClick={() => handleSocialLogin('Google')}
                  >
                    <FaGoogle /> <span>Google</span>
                  </button>
                  <button
                    className="social-btn facebook-btn"
                    onClick={() => handleSocialLogin('Facebook')}
                  >
                    <FaFacebook /> <span>Facebook</span>
                  </button>
                </div>
              </div>

              {/* Register Link */}
              <div className="login-link-section text-center mt-4">
                <p>
                  Don't have an account?{' '}
                  <Link to="/register" className="login-link">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5">
            <div className="visual-section">
              <div className="visual-content">
                <div className="visual-title">
                  <h2>Welcome Back to CodeAlpha Store</h2>
                  <p>Your shopping journey continues here</p>
                </div>
                <div className="visual-features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaUser />
                    </div>
                    <div className="feature-text">
                      <h4>Personalized Experience</h4>
                      <p>Get recommendations based on your preferences</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaShieldAlt />
                    </div>
                    <div className="feature-text">
                      <h4>Secure Access</h4>
                      <p>Your account is protected with advanced security</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaStar />
                    </div>
                    <div className="feature-text">
                      <h4>Member Benefits</h4>
                      <p>Enjoy exclusive perks and early access to deals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
