import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch,
  FaFilter,
  // FaGrid3X3,
  FaList,
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaEye
} from 'react-icons/fa';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      isNew: true,
      discount: 30
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      category: "Electronics",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.3,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      isNew: false,
      discount: 20
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      category: "Home & Kitchen",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.7,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
      isNew: false,
      discount: 25
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt",
      category: "Fashion",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.2,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      isNew: true,
      discount: 25
    },
    {
      id: 5,
      name: "Portable Bluetooth Speaker",
      category: "Electronics",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
      isNew: false,
      discount: 20
    },
    {
      id: 6,
      name: "Stainless Steel Water Bottle",
      category: "Home & Kitchen",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.6,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
      isNew: false,
      discount: 28
    },
    {
      id: 7,
      name: "Wireless Gaming Mouse",
      category: "Electronics",
      price: 69.99,
      originalPrice: 89.99,
      rating: 4.1,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
      isNew: true,
      discount: 22
    },
    {
      id: 8,
      name: "Yoga Mat Premium",
      category: "Sports",
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
      isNew: false,
      discount: 33
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'sports', name: 'Sports' },
    { id: 'books', name: 'Books' },
    { id: 'beauty', name: 'Beauty' }
  ];

  // Filter and search products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase().includes(selectedCategory);
    const matchesPrice = product.price <= priceRange;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar 
        key={index} 
        className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
      />
    ));
  };

  return (
    <div className="products-page">
      {/* Hero Section */}
      <div className="products-hero">
        <div className="container">
          <h1 className="products-title">Our Products</h1>
          <p className="products-subtitle">
            Discover amazing products at unbeatable prices
          </p>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-lg-3">
            <div className="filters-sidebar">
              <h3 className="filters-title">
                <FaFilter /> Filters
              </h3>

              {/* Category Filter */}
              <div className="filter-section">
                <h5>Category</h5>
                <div className="category-filters">
                  {categories.map(category => (
                    <label key={category.id} className="filter-option">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      />
                      {category.name}
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
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="price-slider"
                  />
                  <div className="price-labels">
                    <span>$0</span>
                    <span>${priceRange}</span>
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
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="col-lg-9">
            {/* View Controls */}
            <div className="view-controls">
              <div className="results-info">
                Showing {sortedProducts.length} of {products.length} products
              </div>
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
              
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FaList />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            {sortedProducts.length > 0 ? (
              <div className={`products-container ${viewMode}-view`}>
                {sortedProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-container">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image"
                      />
                      {product.isNew && (
                        <span className="new-badge">NEW</span>
                      )}
                      {product.discount && (
                        <span className="discount-badge">-{product.discount}%</span>
                      )}
                      <div className="product-actions">
                        <button className="action-btn" title="Quick View">
                          <FaEye size={14} />
                        </button>
                        <button className="action-btn" title="Add to Wishlist">
                          <FaHeart size={14} />
                        </button>
                        <button className="action-btn" title="Add to Cart">
                          <FaShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-category">{product.category}</div>
                      <h3 className="product-name">
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                      </h3>
                      <div className="product-rating">
                        <div className="stars">
                          {renderStars(product.rating)}
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
            ) : (
              <div className="no-results">
                <div className="no-results-content">
                  <h3>No products found</h3>
                  <p>Try adjusting your search criteria or filters to find what you're looking for.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange(1000);
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

export default Products;
