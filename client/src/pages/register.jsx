import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaCheckCircle,
  FaExclamationCircle,
  FaShieldAlt,
  FaGift,
  FaStar
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Remove confirmPassword and agreeToTerms from the data sent to API
      const { confirmPassword, agreeToTerms, ...registrationData } = formData;
      await register(registrationData);
      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="register-page">
      <div className="bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      <div className="container-fluid">
        <div className="row min-vh-100">
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-5">
            <div className="register-form-container w-100" style={{ maxWidth: '500px' }}>
              <div className="text-center mb-5">
                <Link to="/" className="text-decoration-none">
                  <h1 className="brand-title mb-3">CodeAlpha Store</h1>
                </Link>
                <h2 className="form-title mb-3">Create Your Account</h2>
                <p className="form-subtitle">Join thousands of satisfied customers</p>
              </div>

              {submitStatus === 'success' && (
                <div className="success-alert">
                  <FaCheckCircle className="success-icon" />
                  <div>
                    <h4>Account Created Successfully!</h4>
                    <p>Redirecting to home page...</p>
                  </div>
                </div>
              )}

              {errors.general && (
                <div className="error-alert">
                  <FaExclamationCircle className="error-icon" />
                  <div>
                    <h4>Registration Failed</h4>
                    <p>{errors.general}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="modern-form" noValidate>
                {/* Name Fields */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <div className="form-field-container">
                      <label htmlFor="firstName" className="field-title">
                        First Name
                      </label>
                      <div className="input-wrapper">
                        <div className="input-icon">
                          <FaUser />
                        </div>
                        <div className="input-content">
                          <input
                            type="text"
                            className={`floating-input ${errors.firstName ? 'error' : ''}`}
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                          />
                        </div>
                      </div>
                      {errors.firstName && (
                        <div className="error-message">
                          <FaExclamationCircle /> {errors.firstName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-field-container">
                      <label htmlFor="lastName" className="field-title">
                        Last Name
                      </label>
                      <div className="input-wrapper">
                        <div className="input-icon">
                          <FaUser />
                        </div>
                        <div className="input-content">
                          <input
                            type="text"
                            className={`floating-input ${errors.lastName ? 'error' : ''}`}
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>
                      {errors.lastName && (
                        <div className="error-message">
                          <FaExclamationCircle /> {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-field-container">
                  <label htmlFor="email" className="field-title">
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FaEnvelope />
                    </div>
                    <div className="input-content">
                      <input
                        type="email"
                        className={`floating-input ${errors.email ? 'error' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
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
                  <label htmlFor="password" className="field-title">
                    Password
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FaLock />
                    </div>
                    <div className="input-content">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={`floating-input ${errors.password ? 'error' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
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

                {/* Confirm Password Field */}
                <div className="form-field-container">
                  <label htmlFor="confirmPassword" className="field-title">
                    Confirm Password
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FaLock />
                    </div>
                    <div className="input-content">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`floating-input ${errors.confirmPassword ? 'error' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                      />
                    </div>
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="error-message">
                      <FaExclamationCircle /> {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="form-field-container">
                  <div className="checkbox-container">
                    <label className="custom-checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="custom-checkbox"
                      />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">
                        I agree to the{' '}
                        <Link to="/terms" className="terms-link">
                          Terms and Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="terms-link">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>
                  {errors.agreeToTerms && (
                    <div className="error-message">
                      <FaExclamationCircle /> {errors.agreeToTerms}
                    </div>
                  )}
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
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <FiArrowRight className="btn-icon" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Social Registration */}
              <div className="social-login-section">
                <div className="divider">
                  <span>or sign up with</span>
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

              {/* Login Link */}
              <div className="login-link-section text-center mt-4">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="login-link">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5">
            <div className="register-content">
              <div className="content-wrapper">
                <div className="feature-card">
                  <div className="feature-icon">
                    <FaGift />
                  </div>
                  <h3>Welcome Bonus</h3>
                  <p>Get exclusive discounts and offers when you join our community</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <FaShieldAlt />
                  </div>
                  <h3>Secure Shopping</h3>
                  <p>Your personal information is protected with bank-level security</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <FaStar />
                  </div>
                  <h3>Premium Support</h3>
                  <p>Get priority customer support and personalized assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
