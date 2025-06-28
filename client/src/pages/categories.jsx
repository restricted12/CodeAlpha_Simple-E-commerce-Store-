import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaFilter,
//   FaGrid3X3,
  FaList,
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaEye
} from 'react-icons/fa';
import { FiGrid, FiList } from 'react-icons/fi';
import '../App.css';

const Categories = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');

  // Sample categories data
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '📱',
      count: 156,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop'
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: '👕',
      count: 234,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    },
    {
      id: 'home',
      name: 'Home & Garden',
      icon: '🏠',
      count: 189,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    },
    {
      id: 'sports',
      name: 'Sports & Outdoors',
      icon: '⚽',
      count: 98,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    {
      id: 'books',
      name: 'Books & Media',
      icon: '📚',
      count: 145,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
    },
    {
      id: 'beauty',
      name: 'Beauty & Health',
      icon: '💄',
      count: 167,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop'
    },
    {
      id: 'toys',
      name: 'Toys & Games',
      icon: '🎮',
      count: 123,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: '🚗',
      count: 89,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'
    }
  ];

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      category: 'electronics',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      isNew: true,
      discount: 30
    },
    {
      id: 2,
      name: 'Premium Cotton T-Shirt',
      category: 'fashion',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.2,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      isNew: false,
      discount: 28
    },
    {
      id: 3,
      name: 'Smart LED Desk Lamp',
      category: 'home',
      price: 45.99,
      originalPrice: 65.99,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop',
      isNew: true,
      discount: 30
    },
    {
      id: 4,
      name: 'Professional Yoga Mat',
      category: 'sports',
      price: 32.99,
      originalPrice: 42.99,
      rating: 4.4,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
      isNew: false,
      discount: 23
    },
    {
      id: 5,
      name: 'Bestseller Novel Collection',
      category: 'books',
      price: 19.99,
      originalPrice: 29.99,
      rating: 4.6,
      reviews: 123,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop',
      isNew: false,
      discount: 33
    },
    {
      id: 6,
      name: 'Organic Face Cream Set',
      category: 'beauty',
      price: 28.99,
      originalPrice: 38.99,
      rating: 4.3,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
      isNew: true,
      discount: 25
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.isNew - a.isNew;
      default:
        return 0;
    }
  });

  return (
    <div className="categories-page">
      {/* Hero Section */}
      <div className="categories-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="categories-title">Shop by Category</h1>
              <p className="categories-subtitle">
                Discover amazing products across all categories. Find exactly what you're looking for with our comprehensive selection.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="search-container">
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-lg-3">
            <div className="filters-sidebar">
              <h4 className="filters-title">
                <FaFilter /> Filters
              </h4>

              {/* Category Filter */}
              <div className="filter-section">
                <h5>Categories</h5>
                <div className="category-filters">
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span>All Categories</span>
                  </label>
                  {categories.map(category => (
                    <label key={category.id} className="filter-option">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      />
                      <span>{category.name} ({category.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="filter-section">
                <h5>Price Range</h5>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="price-slider"
                  />
                  <div className="price-labels">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div className="filter-section">
                <h5>Sort By</h5>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {/* View Controls */}
            <div className="view-controls">
              <div className="results-info">
                <span>{sortedProducts.length} products found</span>
              </div>
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`products-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
              {sortedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                    {product.isNew && <span className="new-badge">New</span>}
                    {product.discount > 0 && (
                      <span className="discount-badge">-{product.discount}%</span>
                    )}
                    <div className="product-actions">
                      <button className="action-btn wishlist-btn">
                        <FaHeart />
                      </button>
                      <button className="action-btn quick-view-btn">
                        <FaEye />
                      </button>
                      <button className="action-btn cart-btn">
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <div className="product-category">{product.category}</div>
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < Math.floor(product.rating) ? 'star filled' : 'star'}
                          />
                        ))}
                      </div>
                      <span className="rating-text">({product.reviews})</span>
                    </div>
                    <div className="product-price">
                      <span className="current-price">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="no-results">
                <div className="no-results-content">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search terms</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange([0, 1000]);
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories; 