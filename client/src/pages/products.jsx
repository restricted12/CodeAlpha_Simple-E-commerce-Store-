import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch,
  FaFilter,
  FaList,
  FaGrid3X3,
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaSpinner,
  FaExclamationTriangle,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaFire,
  FaTag,
  FaShippingFast,
  FaShieldAlt,
  FaThumbsUp,
  FaSort,
  FaBars,
  FaTimes as FaClose
} from 'react-icons/fa';
import { authGet } from '../utils/api';
import { addToCart, getCartItemCount } from '../utils/cartUtils';
import './products.css';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showQuickView, setShowQuickView] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  // Update cart item count when component mounts and when cart changes
  useEffect(() => {
    setCartItemCount(getCartItemCount());
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartItemCount(getCartItemCount());
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all products from the API
      const response = await authGet('/products/get-all-products');
      setProducts(response);
      
      // Extract unique categories from products
      const uniqueCategories = [...new Set(response.map(product => product.category).filter(Boolean))];
      setCategories([
        { id: 'all', name: 'All Categories' },
        ...uniqueCategories.map(category => ({ id: category.toLowerCase(), name: category }))
      ]);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter and search products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || 
                           (product.category && product.category.toLowerCase() === selectedCategory);
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
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleAddToCart = (product) => {
    // Use the cart utility function
    const success = addToCart(product, 1);
    
    if (success) {
      // Update cart item count
      setCartItemCount(getCartItemCount());
      alert(`${product.name} added to cart!`);
    } else {
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleAddToWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item._id === product._id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange(1000);
    setSortBy('featured');
  };

  const getSortLabel = (sortValue) => {
    const sortLabels = {
      'featured': 'Featured',
      'price-low': 'Price: Low to High',
      'price-high': 'Price: High to Low',
      'name': 'Name: A to Z',
      'newest': 'Newest First'
    };
    return sortLabels[sortValue] || 'Featured';
  };

  const handleProductClick = (product) => {
    // Store product ID in localStorage when user clicks on a product
    localStorage.setItem('selectedProductId', product._id);
    console.log('Product ID stored in localStorage:', product._id);
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="text-center py-5">
            <FaSpinner className="spinner-border text-primary mb-3" style={{ fontSize: '2rem' }} />
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="text-center py-5">
            <FaExclamationTriangle className="text-danger mb-3" style={{ fontSize: '3rem' }} />
            <h3>Error Loading Products</h3>
            <p className="text-muted">{error}</p>
            <button className="btn btn-primary" onClick={fetchProducts}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Enhanced Hero Section */}
      <div className="products-hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaFire className="me-2" />
              <span>Hot Deals Available</span>
            </div>
            <h1 className="products-title">
              Discover Amazing <span className="gradient-text">Products</span>
            </h1>
            <p className="products-subtitle">
              Shop from thousands of premium products with unbeatable prices and fast delivery
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="search-container">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for products, brands, or categories..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="search-clear"
                    onClick={() => setSearchTerm('')}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <FaTag className="stat-icon" />
                <span className="stat-number">{products.length}+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-item">
                <FaShippingFast className="stat-icon" />
                <span className="stat-number">Free</span>
                <span className="stat-label">Shipping</span>
              </div>
              <div className="stat-item">
                <FaShieldAlt className="stat-icon" />
                <span className="stat-number">100%</span>
                <span className="stat-label">Secure</span>
              </div>
              <div className="stat-item">
                <FaThumbsUp className="stat-icon" />
                <span className="stat-number">4.9</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Controls */}
      <div className={`mobile-controls ${isScrolled ? 'scrolled' : ''}`}>
        <button 
          className="mobile-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
          <span>Filters</span>
          <span className="filter-count">
            {[searchTerm, selectedCategory !== 'all', priceRange < 1000].filter(Boolean).length}
          </span>
        </button>
        
        <div className="sort-dropdown">
          <button 
            className="mobile-toggle-btn"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <FaSort />
            <span>{getSortLabel(sortBy)}</span>
            <FaChevronDown className={`chevron ${showSortDropdown ? 'open' : ''}`} />
          </button>
          
          {showSortDropdown && (
            <div className="sort-options">
              {[
                { value: 'featured', label: 'Featured' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'name', label: 'Name: A to Z' },
                { value: 'newest', label: 'Newest First' }
              ].map(option => (
                <button
                  key={option.value}
                  className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                  onClick={() => {
                    setSortBy(option.value);
                    setShowSortDropdown(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Enhanced Filters Sidebar */}
          <div className={`col-lg-3 filters-sidebar ${showFilters ? 'mobile-open' : ''}`}>
            <div className="filters-content">
              <div className="filters-header">
                <h3 className="filters-title">
                  <FaFilter /> Filters
                </h3>
                <button 
                  className="mobile-close-btn"
                  onClick={() => setShowFilters(false)}
                >
                  <FaClose />
                </button>
              </div>
              
              {/* Active Filters */}
              {(searchTerm || selectedCategory !== 'all' || priceRange < 1000) && (
                <div className="active-filters">
                  <h4>Active Filters</h4>
                  <div className="filter-tags">
                    {searchTerm && (
                      <span className="filter-tag">
                        Search: "{searchTerm}"
                        <button onClick={() => setSearchTerm('')}>
                          <FaTimes />
                        </button>
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="filter-tag">
                        Category: {categories.find(c => c.id === selectedCategory)?.name}
                        <button onClick={() => setSelectedCategory('all')}>
                          <FaTimes />
                        </button>
                      </span>
                    )}
                    {priceRange < 1000 && (
                      <span className="filter-tag">
                        Max: ${priceRange}
                        <button onClick={() => setPriceRange(1000)}>
                          <FaTimes />
                        </button>
                      </span>
                    )}
                  </div>
                  <button className="clear-filters-btn" onClick={clearFilters}>
                    Clear All Filters
                  </button>
                </div>
              )}
              
              {/* Categories Filter */}
              <div className="filter-section">
                <h4>Categories</h4>
                <div className="category-filters">
                  {categories.map(category => (
                    <label key={category.id} className="category-filter">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      />
                      <span className="checkmark"></span>
                      <span className="category-name">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="filter-section">
                <h4>Price Range</h4>
                <div className="price-range">
                  <div className="price-display">
                    <span>$0</span>
                    <span>${priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="price-slider"
                  />
                </div>
              </div>

              {/* Stock Filter */}
              <div className="filter-section">
                <h4>Availability</h4>
                <div className="stock-filters">
                  <label className="stock-filter">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {/* Enhanced Products Header */}
            <div className="products-header">
              <div className="products-info">
                <div className="products-count">
                  Showing <strong>{sortedProducts.length}</strong> of <strong>{products.length}</strong> products
                </div>
                {searchTerm && (
                  <div className="search-results">
                    Results for "<strong>{searchTerm}</strong>"
                  </div>
                )}
              </div>
              
              <div className="products-controls">
                <div className="view-toggle">
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                  >
                    <FaGrid3X3 />
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List View"
                  >
                    <FaList />
                  </button>
                </div>
                
                <div className="desktop-sort">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {sortedProducts.length === 0 ? (
              <div className="no-products">
                <div className="no-products-content">
                  <div className="no-products-icon">
                    <FaExclamationTriangle />
                  </div>
                  <h3>No Products Found</h3>
                  <p>Try adjusting your filters or search terms to find what you're looking for.</p>
                  <button className="btn btn-primary" onClick={clearFilters}>
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                {sortedProducts.map((product, index) => (
                  <div 
                    key={product._id} 
                    className="product-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="product-image">
                      <img 
                        src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                        }}
                      />
                      
                      {/* Product Badges */}
                      <div className="product-badges">
                        {product.stock <= 5 && product.stock > 0 && (
                          <span className="badge badge-warning">Low Stock</span>
                        )}
                        {product.stock <= 0 && (
                          <span className="badge badge-danger">Out of Stock</span>
                        )}
                        {product.price < 50 && (
                          <span className="badge badge-success">Great Deal</span>
                        )}
                      </div>
                      
                      {/* Wishlist Button */}
                      <button
                        className={`wishlist-btn ${isInWishlist(product._id) ? 'active' : ''}`}
                        onClick={() => handleAddToWishlist(product)}
                        title={isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <FaHeart />
                      </button>
                      
                      {/* Product Overlay */}
                      <div className="product-overlay">
                        <button
                          className="overlay-btn"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock <= 0}
                          title="Add to Cart"
                        >
                          <FaShoppingCart />
                        </button>
                        <Link 
                          to={`/product/${product._id}`} 
                          className="overlay-btn"
                          onClick={() => handleProductClick(product)}
                          title="Quick View"
                        >
                          <FaEye />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="product-info">
                      <div className="product-header">
                        <h3 className="product-name">
                          <Link 
                            to={`/product/${product._id}`}
                            onClick={() => handleProductClick(product)}
                          >
                            {product.name}
                          </Link>
                        </h3>
                        {product.category && (
                          <span className="product-category">{product.category}</span>
                        )}
                      </div>
                      
                      <div className="product-rating">
                        <div className="stars">
                          {renderStars(4.5)}
                        </div>
                        <span className="rating-count">(4.5)</span>
                        <span className="reviews-count">(128 reviews)</span>
                      </div>
                      
                      <div className="product-price">
                        <span className="current-price">{formatPrice(product.price)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      
                      {product.description && (
                        <p className="product-description">
                          {product.description.length > 100 
                            ? `${product.description.substring(0, 100)}...` 
                            : product.description
                          }
                        </p>
                      )}
                      
                      <div className="product-footer">
                        <div className="product-stock">
                          <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                        
                        <div className="product-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock <= 0}
                          >
                            <FaShoppingCart className="me-1" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
