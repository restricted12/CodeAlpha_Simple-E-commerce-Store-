import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaArrowRight,
  FaFire,
  FaTag,
  FaClock,
  FaUsers
} from 'react-icons/fa';
import './categories.css';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Enhanced categories data with more details
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '📱',
      count: 156,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      description: 'Latest gadgets and tech innovations',
      featured: true,
      color: '#667eea'
    },
    {
      id: 'fashion',
      name: 'Fashion & Style',
      icon: '👕',
      count: 234,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      description: 'Trendy clothing and accessories',
      featured: true,
      color: '#f093fb'
    },
    {
      id: 'home',
      name: 'Home & Living',
      icon: '🏠',
      count: 189,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      description: 'Beautiful home decor and furniture',
      featured: false,
      color: '#4facfe'
    },
    {
      id: 'sports',
      name: 'Sports & Fitness',
      icon: '⚽',
      count: 98,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      description: 'Equipment for active lifestyle',
      featured: false,
      color: '#43e97b'
    },
    {
      id: 'books',
      name: 'Books & Media',
      icon: '📚',
      count: 145,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      description: 'Knowledge and entertainment',
      featured: false,
      color: '#fa709a'
    },
    {
      id: 'beauty',
      name: 'Beauty & Health',
      icon: '💄',
      count: 167,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
      description: 'Personal care and wellness',
      featured: true,
      color: '#ff9a9e'
    },
    {
      id: 'toys',
      name: 'Toys & Games',
      icon: '🎮',
      count: 123,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      description: 'Fun for all ages',
      featured: false,
      color: '#a8edea'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: '🚗',
      count: 89,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
      description: 'Car accessories and parts',
      featured: false,
      color: '#ffecd2'
    }
  ];

  // Featured products for each category
  const featuredProducts = {
    electronics: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 89.99,
        originalPrice: 129.99,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
        discount: 30
      },
      {
        id: 2,
        name: 'Smart LED Desk Lamp',
        price: 45.99,
        originalPrice: 65.99,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop',
        discount: 30
      }
    ],
    fashion: [
      {
        id: 3,
        name: 'Premium Cotton T-Shirt',
        price: 24.99,
        originalPrice: 34.99,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
        discount: 28
      }
    ],
    beauty: [
      {
        id: 4,
        name: 'Organic Face Cream Set',
        price: 28.99,
        originalPrice: 38.99,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
        discount: 25
      }
    ]
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredCategories = categories.filter(category => category.featured);
  const regularCategories = categories.filter(category => !category.featured);

  return (
    <div className="categories-page">
      {/* Hero Section */}
      <div className="categories-hero">
        <div className="hero-content">
          <h1 className="hero-title">Explore Our Categories</h1>
          <p className="hero-subtitle">
            Discover amazing products across all categories. Find exactly what you're looking for.
          </p>
          
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Featured Categories */}
        {featuredCategories.length > 0 && (
          <section className="featured-section">
            <div className="section-header">
              <h2 className="section-title">
                <FaFire className="title-icon" />
                Featured Categories
              </h2>
              <p className="section-subtitle">Most popular categories with trending products</p>
            </div>
            
            <div className="featured-grid">
              {featuredCategories.map(category => (
                <div key={category.id} className="featured-category-card">
                  <div className="category-image-container">
                    <img src={category.image} alt={category.name} className="category-image" />
                    <div className="category-overlay">
                      <div className="category-content">
                        <span className="category-icon">{category.icon}</span>
                        <h3 className="category-name">{category.name}</h3>
                        <p className="category-description">{category.description}</p>
                        <div className="category-stats">
                          <span className="product-count">{category.count} products</span>
                        </div>
                        <Link to={`/products?category=${category.id}`} className="explore-btn">
                          Explore <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Featured Products Preview */}
                  {featuredProducts[category.id] && (
                    <div className="featured-products">
                      <h4 className="featured-title">Popular Products</h4>
                      <div className="products-preview">
                        {featuredProducts[category.id].map(product => (
                          <div key={product.id} className="product-preview-card">
                            <img src={product.image} alt={product.name} className="product-preview-image" />
                            <div className="product-preview-info">
                              <h5 className="product-preview-name">{product.name}</h5>
                              <div className="product-preview-rating">
                                <FaStar className="star filled" />
                                <span>{product.rating}</span>
                              </div>
                              <div className="product-preview-price">
                                <span className="current-price">${product.price}</span>
                                <span className="original-price">${product.originalPrice}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Categories */}
        <section className="all-categories-section">
          <div className="section-header">
            <h2 className="section-title">
              <FaTag className="title-icon" />
              All Categories
            </h2>
            <p className="section-subtitle">Browse through all our product categories</p>
          </div>

          <div className="categories-grid">
            {filteredCategories.map(category => (
              <div key={category.id} className="category-card">
                <div className="category-card-image">
                  <img src={category.image} alt={category.name} />
                  <div className="category-card-overlay">
                    <span className="category-card-icon">{category.icon}</span>
                  </div>
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-name">{category.name}</h3>
                  <p className="category-card-description">{category.description}</p>
                  <div className="category-card-footer">
                    <span className="category-card-count">
                      <FaUsers /> {category.count} products
                    </span>
                    <Link to={`/products?category=${category.id}`} className="category-card-btn">
                      Browse <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FaTag />
              </div>
              <div className="stat-content">
                <h3 className="stat-number">{categories.length}</h3>
                <p className="stat-label">Categories</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaShoppingCart />
              </div>
              <div className="stat-content">
                <h3 className="stat-number">{categories.reduce((sum, cat) => sum + cat.count, 0)}</h3>
                <p className="stat-label">Total Products</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaStar />
              </div>
              <div className="stat-content">
                <h3 className="stat-number">4.8</h3>
                <p className="stat-label">Average Rating</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaClock />
              </div>
              <div className="stat-content">
                <h3 className="stat-number">24/7</h3>
                <p className="stat-label">Customer Support</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories; 