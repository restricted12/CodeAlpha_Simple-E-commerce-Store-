import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaArrowLeft,
  FaShare,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
  FaSpinner,
  FaExclamationTriangle,
  FaMinus,
  FaPlus
} from 'react-icons/fa';
import './singleproduct.css';

const SingleProduct = () => {
  const navigate = useNavigate();
  const { getProductById, productsLoading } = useAuth();
  
  // Get product ID from localStorage instead of URL params
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Get product ID from localStorage
    const storedProductId = localStorage.getItem('selectedProductId');
    if (storedProductId) {
      setProductId(storedProductId);
    } else {
      setError('No product selected. Please go back to products page.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productData = await getProductById(productId);
      setProduct(productData);
      
      // Reset selected image to 0 when product data is loaded
      setSelectedImage(0);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details. Please try again.');
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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={`star ${i <= rating ? 'filled' : ''}`}
        />
      );
    }
    return stars;
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    console.log('Adding to cart:', { product, quantity });
    alert(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`);
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    setIsWishlisted(!isWishlisted);
    alert(isWishlisted ? 'Removed from wishlist!' : 'Added to wishlist!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading || productsLoading) {
    return (
      <div className="single-product-page">
        <div className="container">
          <div className="text-center py-5">
            <FaSpinner className="spinner-border text-primary mb-3" style={{ fontSize: '2rem' }} />
            <p>Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="single-product-page">
        <div className="container">
          <div className="text-center py-5">
            <FaExclamationTriangle className="text-danger mb-3" style={{ fontSize: '3rem' }} />
            <h3>Product Not Found</h3>
            <p className="text-muted">{error || 'The product you are looking for does not exist.'}</p>
            <div className="mt-4">
              {productId && (
                <button className="btn btn-primary me-3" onClick={fetchProductDetails}>
                  Try Again
                </button>
              )}
              <Link to="/products" className="btn btn-outline-primary">
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const productImages = [
    product.image || 'https://via.placeholder.com/600x600?text=No+Image',
    ...(product.extraImages && product.extraImages.length > 0 
      ? product.extraImages 
      : [
          'https://via.placeholder.com/600x600?text=Product+View+2',
          'https://via.placeholder.com/600x600?text=Product+View+3',
          'https://via.placeholder.com/600x600?text=Product+View+4'
        ]
    )
  ];

  return (
    <div className="single-product-page">
      <div className="container">
        <nav className="breadcrumb-nav">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/products" className="breadcrumb-link">Products</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="back-button-container">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            <FaArrowLeft className="me-2" />
            Back
          </button>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="product-images">
              <div className="main-image-container">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="main-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                  }}
                />
                {product.stock <= 0 && (
                  <div className="out-of-stock-badge">
                    Out of Stock
                  </div>
                )}
              </div>

              <div className="thumbnail-images">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="product-details">
              <div className="product-header">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-meta">
                  <div className="product-rating">
                    {renderStars(4.5)}
                    <span className="rating-text">4.5 (128 reviews)</span>
                  </div>
                  <div className="product-category">
                    Category: <span>{product.category || 'Uncategorized'}</span>
                  </div>
                </div>
              </div>

              <div className="product-price">
                <span className="current-price">{formatPrice(product.price)}</span>
                <span className="original-price">{formatPrice(product.price * 1.2)}</span>
                <span className="discount-badge">Save 20%</span>
              </div>

              <div className="product-description">
                <h4>Description</h4>
                <p>{product.description || 'No description available for this product.'}</p>
              </div>

              <div className="stock-info">
                <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {product.stock > 0 && (
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange('decrease')}
                      disabled={quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange('increase')}
                      disabled={quantity >= product.stock}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              )}

              <div className="action-buttons">
                <button
                  className="btn btn-primary btn-lg add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  <FaShoppingCart className="me-2" />
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  className={`btn btn-outline-secondary wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={handleAddToWishlist}
                >
                  <FaHeart className="me-2" />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
                
                <button className="btn btn-outline-secondary share-btn" onClick={handleShare}>
                  <FaShare className="me-2" />
                  Share
                </button>
              </div>

              
            </div>
          </div>
        </div>

        <div className="related-products">
          <h3>You Might Also Like</h3>
          <div className="row">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="col-md-3">
                <div className="related-product-card">
                  <div className="related-product-image">
                    <div 
                      style={{ 
                        height: '200px', 
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <span className="text-muted">Related Product {index + 1}</span>
                    </div>
                  </div>
                  <div className="related-product-info">
                    <h5>Related Product {index + 1}</h5>
                    <p className="price">$99.99</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct; 