import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch,
  FaFilter,
  FaList,
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import AddToCartButton from '../components/AddToCartButton';
import './products-new.css';

const ProductsNew = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  
  // Use AuthContext for product management
  const { 
    products, 
    productsLoading, 
    productsError, 
    categories, 
    fetchProducts, 
    searchProducts, 
    sortProducts 
  } = useAuth();

  // Fetch products on component mount
  useEffect(() => {
    // Only fetch if products are not already loaded
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // Filter and search products using AuthContext functions
  const filteredProducts = searchProducts(searchTerm, {
    category: selectedCategory,
    maxPrice: priceRange
  });

  // Sort products using AuthContext function
  const sortedProducts = sortProducts(filteredProducts, sortBy);

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

  const handleAddToWishlist = (product) => {
    console.log('Add to wishlist:', product);
    alert(`${product.name} added to wishlist!`);
  };

  if (productsLoading) {
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

  if (productsError) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="text-center py-5">
            <FaExclamationTriangle className="text-danger mb-3" style={{ fontSize: '3rem' }} />
            <h3>Error Loading Products</h3>
            <p className="text-muted">{productsError}</p>
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
                      {category.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="filter-section">
                <h4>Price Range</h4>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="price-slider"
                  />
                  <div className="price-display">
                    $0 - ${priceRange}
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div className="filter-section">
                <h4>Sort By</h4>
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

          {/* Products Grid */}
          <div className="col-lg-9">
            {/* Products Header */}
            <div className="products-header">
              <div className="products-count">
                Showing {sortedProducts.length} of {products.length} products
              </div>
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FaList />
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
            {sortedProducts.length === 0 ? (
              <div className="text-center py-5">
                <h3>No Products Found</h3>
                <p className="text-muted">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                {sortedProducts.map((product) => (
                  <div key={product._id} className="product-card">
                    <div className="product-image">
                      <img 
                        src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                        }}
                      />
                      <div className="product-overlay">
                        <AddToCartButton 
                          product={product} 
                          size="small"
                        />
                        <button
                          className="overlay-btn"
                          onClick={() => handleAddToWishlist(product)}
                        >
                          <FaHeart />
                        </button>
                        <Link to={`/product/${product._id}`} className="overlay-btn">
                          <FaEye />
                        </Link>
                      </div>
                      {product.stock <= 0 && (
                        <div className="out-of-stock">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      {product.category && (
                        <p className="product-category">{product.category}</p>
                      )}
                      <div className="product-rating">
                        {renderStars(4.5)}
                        <span className="rating-count">(4.5)</span>
                      </div>
                      <div className="product-price">
                        <span className="current-price">{formatPrice(product.price)}</span>
                      </div>
                      {product.description && (
                        <p className="product-description">
                          {product.description.length > 100 
                            ? `${product.description.substring(0, 100)}...` 
                            : product.description
                          }
                        </p>
                      )}
                      <div className="product-stock">
                        Stock: {product.stock} available
                      </div>
                      <div className="product-actions">
                        <AddToCartButton 
                          product={product} 
                          size="medium"
                        />
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

export default ProductsNew; 