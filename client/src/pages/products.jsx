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
import FilterToggle from '../components/FilterToggle';
import AddToCartButton from '../components/AddToCartButton';
import { authGet } from '../utils/api';
import { addToCart, getCartItemCount } from '../utils/cartUtils';

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
    // TODO: Implement add to wishlist functionality
    console.log('Add to wishlist:', product);
    alert(`${product.name} added to wishlist!`);
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
                        <button
                          className="overlay-btn"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock <= 0}
                        >
                          <FaShoppingCart />
                        </button>
                        <button
                          className="overlay-btn"
                          onClick={() => handleAddToWishlist(product)}
                        >
                          <FaHeart />
                        </button>
                        <Link 
                          to={`/product/${product._id}`} 
                          className="overlay-btn"
                          onClick={() => handleProductClick(product)}
                        >
                          <FaEye />
                        </Link>
                      </div>
                      {product.stock <= 0 && (
                        <div className="out-of-stock">
                          Out of Stock
                        </div>
                      )}
                      {/* Show image count if there are extra images */}
                      {product.extraImages && product.extraImages.length > 0 && (
                        <div className="image-count-badge">
                          +{product.extraImages.length}
                        </div>
                      )}
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">
                        <Link 
                          to={`/product/${product._id}`}
                          onClick={() => handleProductClick(product)}
                        >
                          {product.name}
                        </Link>
                      </h3>
                      {product.category && (
                        <p className="product-category">{product.category}</p>
                      )}
                      <div className="product-rating">
                        {renderStars(4.5)} {/* Default rating since it's not in the model */}
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
