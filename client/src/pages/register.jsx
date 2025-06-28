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
import '../App.css';

const Register = () => {
  const navigate = useNavigate();
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

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
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
                    <p>Redirecting to login page...</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="modern-form" noValidate>
                {/* Name Fields */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <div className="form-field-container">
                      <div className="input-wrapper">
                        <div className="input-icon">
                          <FaUser />
                        </div>
                        <div className="input-content">
                          <label htmlFor="firstName" className="floating-label">
                            First Name
                          </label>
                          <input
                            type="text"
                            className={`floating-input ${errors.firstName ? 'error' : ''} ${formData.firstName ? 'has-value' : ''}`}
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder=" "
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
                      <div className="input-wrapper">
                        <div className="input-icon">
                          <FaUser />
                        </div>
                        <div className="input-content">
                          <label htmlFor="lastName" className="floating-label">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className={`floating-input ${errors.lastName ? 'error' : ''} ${formData.lastName ? 'has-value' : ''}`}
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder=" "
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

                {/* Confirm Password Field */}
                <div className="form-field-container">
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FaLock />
                    </div>
                    <div className="input-content">
                      <label htmlFor="confirmPassword" className="floating-label">
                        Confirm Password
                      </label>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`floating-input ${errors.confirmPassword ? 'error' : ''} ${formData.confirmPassword ? 'has-value' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder=" "
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

                {/* Terms Agreement */}
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
                        <Link to="/terms" className="terms-link">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="terms-link">Privacy Policy</Link>
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

              {/* Social Login */}
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
              <div className="register-link-section text-center mt-4">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="register-link">
                    Sign in here
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
                  <h2>Join CodeAlpha Store Today</h2>
                  <p>Start your shopping journey with us</p>
                </div>
                <div className="visual-features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaGift />
                    </div>
                    <div className="feature-text">
                      <h4>Welcome Bonus</h4>
                      <p>Get exclusive discounts on your first purchase</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaShieldAlt />
                    </div>
                    <div className="feature-text">
                      <h4>Secure Registration</h4>
                      <p>Your data is protected with industry-standard security</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaStar />
                    </div>
                    <div className="feature-text">
                      <h4>Member Rewards</h4>
                      <p>Earn points and unlock special member benefits</p>
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

export default Register;
