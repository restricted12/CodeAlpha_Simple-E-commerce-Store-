import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBell, 
  FaHeart, 
  FaTag, 
  FaShieldAlt, 
  FaTruck,
  FaCheckCircle
} from 'react-icons/fa';
import '../App.css';

const Deals = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Deals' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'sports', name: 'Sports' },
    { id: 'beauty', name: 'Beauty' }
  ];

  const deals = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      originalPrice: 1199.99,
      salePrice: 999.99,
      discount: 17,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      category: "electronics",
      badge: "Flash Sale",
      timeLeft: "2 days left",
      description: "Latest iPhone with advanced camera system and A17 Pro chip"
    },
    {
      id: 2,
      name: "MacBook Air M3",
      originalPrice: 1299.99,
      salePrice: 1099.99,
      discount: 15,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      category: "electronics",
      badge: "Limited Time",
      timeLeft: "5 days left",
      description: "Ultra-thin laptop with incredible performance and battery life"
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      originalPrice: 150.00,
      salePrice: 89.99,
      discount: 40,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "sports",
      badge: "Hot Deal",
      timeLeft: "1 day left",
      description: "Comfortable running shoes with Air Max technology"
    },
    {
      id: 4,
      name: "Wireless Headphones",
      originalPrice: 299.99,
      salePrice: 199.99,
      discount: 33,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "electronics",
      badge: "Best Seller",
      timeLeft: "3 days left",
      description: "Premium noise-canceling headphones with 30-hour battery"
    },
    {
      id: 5,
      name: "Designer Handbag",
      originalPrice: 450.00,
      salePrice: 299.99,
      discount: 33,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      category: "fashion",
      badge: "Trending",
      timeLeft: "4 days left",
      description: "Luxury leather handbag with gold hardware"
    },
    {
      id: 6,
      name: "Smart Watch",
      originalPrice: 399.99,
      salePrice: 249.99,
      discount: 38,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "electronics",
      badge: "Flash Sale",
      timeLeft: "6 hours left",
      description: "Advanced fitness tracking and health monitoring"
    },
    {
      id: 7,
      name: "Kitchen Mixer",
      originalPrice: 299.99,
      salePrice: 199.99,
      discount: 33,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      category: "home",
      badge: "Home Essential",
      timeLeft: "2 days left",
      description: "Professional stand mixer for all your baking needs"
    },
    {
      id: 8,
      name: "Skincare Set",
      originalPrice: 120.00,
      salePrice: 79.99,
      discount: 33,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      category: "beauty",
      badge: "Beauty Must-Have",
      timeLeft: "1 week left",
      description: "Complete skincare routine with natural ingredients"
    }
  ];

  const filteredDeals = selectedCategory === 'all' 
    ? deals 
    : deals.filter(deal => deal.category === selectedCategory);

  const featuredDeal = {
    name: "Mega Sale - Up to 70% Off",
    description: "Don't miss our biggest sale of the year! Limited time only.",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop",
    endDate: "2024-01-15"
  };

  return (
    <div className="deals-page">
      {/* Hero Section */}
      <section className="deals-hero py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Amazing Deals</h1>
              <p className="lead mb-4">
                Discover incredible savings on your favorite products. 
                Limited time offers you won't want to miss!
              </p>
              <div className="d-flex gap-3">
                <Link to="/products" className="btn btn-light btn-lg">
                  Shop All Products
                </Link>
                <button className="btn btn-outline-light btn-lg">
                  <FaBell className="me-2" />
                  Get Notified
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="featured-deal-card p-4 bg-white text-dark rounded-3">
                <h3 className="fw-bold mb-2">{featuredDeal.name}</h3>
                <p className="mb-3">{featuredDeal.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-danger fs-6">Ends Soon</span>
                  <span className="text-muted">Ends: {featuredDeal.endDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="category-filter py-4 bg-light">
        <div className="container">
          <div className="d-flex justify-content-center flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="deals-grid py-5">
        <div className="container">
          <div className="row g-4">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="col-md-6 col-lg-4 col-xl-3">
                <div className="deal-card h-100 border-0 shadow-sm position-relative">
                  {/* Badge */}
                  <div className="deal-badge position-absolute top-0 start-0 m-2">
                    <span className={`badge ${
                      deal.badge === 'Flash Sale' ? 'bg-danger' :
                      deal.badge === 'Limited Time' ? 'bg-warning' :
                      deal.badge === 'Hot Deal' ? 'bg-danger' :
                      deal.badge === 'Best Seller' ? 'bg-success' :
                      deal.badge === 'Trending' ? 'bg-primary' :
                      deal.badge === 'Home Essential' ? 'bg-info' :
                      'bg-secondary'
                    }`}>
                      {deal.badge}
                    </span>
                  </div>

                  {/* Time Left */}
                  <div className="time-left position-absolute top-0 end-0 m-2">
                    <span className="badge bg-dark">{deal.timeLeft}</span>
                  </div>

                  {/* Product Image */}
                  <div className="deal-image-container">
                    <img
                      src={deal.image}
                      className="card-img-top"
                      alt={deal.name}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="discount-badge position-absolute top-50 start-50 translate-middle">
                      <span className="badge bg-danger fs-5">-{deal.discount}%</span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-2">{deal.name}</h5>
                    <p className="card-text text-muted small mb-3">{deal.description}</p>
                    
                    {/* Pricing */}
                    <div className="pricing mb-3">
                      <span className="h5 fw-bold text-primary me-2">${deal.salePrice}</span>
                      <span className="text-muted text-decoration-line-through">${deal.originalPrice}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2">
                      <Link to={`/products/${deal.id}`} className="btn btn-primary flex-fill">
                        View Details
                      </Link>
                      <button className="btn btn-outline-primary">
                        <FaHeart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredDeals.length === 0 && (
            <div className="text-center py-5">
              <h3 className="text-muted">No deals found in this category</h3>
              <p className="text-muted">Try selecting a different category or check back later for new deals.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-3">Never Miss a Deal!</h2>
              <p className="lead mb-4">
                Subscribe to our newsletter and be the first to know about exclusive offers, 
                flash sales, and special promotions.
              </p>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email address"
                    />
                    <button className="btn btn-primary btn-lg">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop Deals Section */}
      <section className="why-deals py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Why Shop Our Deals?</h2>
            <p className="lead text-muted">Get the best value for your money</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <div className="mb-3">
                  <FaTag size={48} className="text-primary" />
                </div>
                <h4 className="fw-bold mb-3">Best Prices</h4>
                <p className="text-muted">
                  We negotiate directly with manufacturers to bring you the lowest prices possible.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="mb-3">
                  <FaShieldAlt size={48} className="text-primary" />
                </div>
                <h4 className="fw-bold mb-3">Quality Guaranteed</h4>
                <p className="text-muted">
                  All our deals feature genuine products with full manufacturer warranty.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="mb-3">
                  <FaTruck size={48} className="text-primary" />
                </div>
                <h4 className="fw-bold mb-3">Fast Delivery</h4>
                <p className="text-muted">
                  Free shipping on most deals with quick delivery to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deals;
