import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaStar,
  FaHeart,
  FaShare,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaCheck,
  FaMinus,
  FaPlus,
  FaEye,
  FaUser,
  FaCalendar,
  FaThumbsUp,
  FaThumbsDown
} from 'react-icons/fa';
import '../App.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  // Sample product data
  const product = {
    id: 1,
    name: 'Premium Wireless Bluetooth Headphones',
    category: 'Electronics',
    brand: 'AudioTech Pro',
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    rating: 4.5,
    reviews: 234,
    stock: 15,
    sku: 'ATH-BT001',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'White', 'Blue'],
    sizes: ['One Size'],
    description: 'Experience crystal-clear sound with our premium wireless Bluetooth headphones.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge (10 min = 5 hours)',
      'Premium comfort design'
    ]
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/categories">Categories</Link>
            </li>
            <li className="breadcrumb-item active">{product.name}</li>
          </ol>
        </nav>

        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6">
            <div className="product-gallery">
              <div className="main-image">
                <img src={product.images[selectedImage]} alt={product.name} />
                {product.discount > 0 && (
                  <span className="discount-badge">-{product.discount}%</span>
                )}
              </div>
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className="product-info">
              <div className="product-header">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-brand">by {product.brand}</div>
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(product.rating) ? 'star filled' : 'star'}
                      />
                    ))}
                  </div>
                  <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="product-price">
                <span className="current-price">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="original-price">${product.originalPrice}</span>
                )}
              </div>

              <div className="product-options">
                {/* Color Selection */}
                {product.colors.length > 0 && (
                  <div className="option-group">
                    <label>Color:</label>
                    <div className="color-options">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="option-group">
                  <label>Quantity:</label>
                  <div className="quantity-selector">
                    <button onClick={() => handleQuantityChange('decrease')}>
                      <FaMinus />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange('increase')}>
                      <FaPlus />
                    </button>
                  </div>
                  <span className="stock-info">{product.stock} in stock</span>
                </div>
              </div>

              <div className="product-actions">
                <button className="btn btn-primary btn-lg add-to-cart-btn">
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="btn btn-outline-primary btn-lg wishlist-btn">
                  <FaHeart />
                </button>
                <button className="btn btn-outline-secondary btn-lg share-btn">
                  <FaShare />
                </button>
              </div>

              <div className="product-features">
                <div className="feature-item">
                  <FaTruck />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="feature-item">
                  <FaShieldAlt />
                  <span>2-year warranty</span>
                </div>
                <div className="feature-item">
                  <FaUndo />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-tab">
                <p>{product.description}</p>
                <h4>Key Features:</h4>
                <ul className="features-list">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                <p>Customer reviews will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
