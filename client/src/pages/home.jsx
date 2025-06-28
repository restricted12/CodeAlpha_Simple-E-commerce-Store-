import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const heroSlides = [
    {
      title: "Beauty Collections",
      subtitle: "Beautiful Materials for beauty's",
      description: "Get up to $200 off with trade-in. Free delivery.",
      image: "https://static.vecteezy.com/system/resources/previews/027/058/701/non_2x/collection-of-make-up-and-cosmetic-beauty-products-arranged-on-red-background-ai-generative-free-photo.jpeg",
      buttonText: "Shop Now",
      buttonLink: "/products"
    },
    {
      title: "Electronics Deivices",
      subtitle: "Powerful performance meets portability",
      description: "Starting at $1,199. Free engraving available.",
      image: "https://app.dropinblog.com/uploaded/blogs/34241141/files/Electronics.png",
      buttonText: "Learn More",
      buttonLink: "/products"
    },
    {
      title: "Summer Collection",
      subtitle: "Fresh styles for every occasion",
      description: "Up to 50% off on selected items. Limited time only.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      buttonText: "Explore Collection",
      buttonLink: "/products"
    },
    {
      title: "Smart Home Essentials",
      subtitle: "Control your home with ease",
      description: "Save on smart lights, speakers, and more.",
      image: "https://food.unl.edu/sites/unl.edu.ianr.extension.food/files/styles/no_crop_1440/public/media/image/kitchen-tools.jpg?itok=kbPL98c1",
      buttonText: "Upgrade Now",
      buttonLink: "/products"
    },
    {
      title: "Back to School Deals",
      subtitle: "Everything students need to succeed",
      description: "Discounts on laptops, bags, and accessories.",
      image: "https://media.sd72.bc.ca/media/Default/pgg/1263/School%20Supplies-1.jpg",
      buttonText: "Shop Deals",
      buttonLink: "/products"
    }
  ];
  

  const categories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      count: 156,
      color: "primary"
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      count: 234,
      color: "success"
    },
    {
      name: "Home & Garden",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      count: 89,
      color: "warning"
    },
    {
      name: "Sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      count: 67,
      color: "danger"
    },
    {
      name: "Books",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      count: 123,
      color: "info"
    },
    {
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
      count: 78,
      color: "secondary"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      category: "Electronics",
      badge: "New"
    },
    {
      id: 2,
      name: "MacBook Air M3",
      price: 1199.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      category: "Computers",
      badge: "Best Seller"
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "Footwear",
      badge: "Sale"
    },
    {
      id: 4,
      name: "Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Electronics",
      badge: "Popular"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      content: "Amazing quality products and fast delivery. I love shopping here!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Tech Enthusiast",
      content: "Best prices for electronics. Customer service is outstanding!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Home Decorator",
      content: "Beautiful home products and great return policy. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    
    // Auto-slide hero carousel
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section with Carousel */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="hero-carousel">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide position-absolute w-100 h-100 ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 0.8s ease-in-out',
                opacity: index === currentSlide ? 1 : 0
              }}
            >
              <div className="container h-100 d-flex align-items-center">
                <div className="hero-content text-white">
                  <h1 className="display-3 fw-bold mb-3">{slide.title}</h1>
                  <h2 className="h4 mb-3">{slide.subtitle}</h2>
                  <p className="lead mb-4">{slide.description}</p>
                  <Link to={slide.buttonLink} className="btn btn-primary btn-lg px-4 py-2">
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Hero Navigation */}
        <button className="hero-nav prev" onClick={prevSlide}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="hero-nav next" onClick={nextSlide}>
          <i className="bi bi-chevron-right"></i>
        </button>
        
        {/* Hero Indicators */}
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Shop by Category</h2>
            <p className="lead text-muted">Discover amazing products in your favorite categories</p>
          </div>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div key={index} className="col-md-4 col-lg-2">
                <Link to="/products" className="text-decoration-none">
                  <div className="card category-card h-100 border-0 shadow-sm overflow-hidden">
                    <div className="category-image-container">
                      <img
                        src={category.image}
                        className="card-img-top category-image"
                        alt={category.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="category-overlay">
                        <div className="category-content text-white text-center">
                          <h5 className="fw-bold mb-2">{category.name}</h5>
                          <p className="mb-0">{category.count} products</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Featured Products</h2>
            <p className="lead text-muted">Handpicked products you'll love</p>
          </div>
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-md-6 col-lg-3">
                <div className="card product-card h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    {product.badge && (
                      <span className={`badge position-absolute top-0 start-0 m-2 ${
                        product.badge === 'New' ? 'bg-primary' :
                        product.badge === 'Sale' ? 'bg-danger' :
                        product.badge === 'Best Seller' ? 'bg-warning' : 'bg-success'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="card-body">
                    <span className="text-muted small">{product.category}</span>
                    <h5 className="card-title fw-bold mt-2">{product.name}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 fw-bold text-primary">${product.price}</span>
                      <Link to={`/products/${product.id}`} className="btn btn-outline-primary btn-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-primary btn-lg px-5">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="feature-item">
                <i className="bi bi-truck display-4 mb-3"></i>
                <h5>Free Shipping</h5>
                <p>On orders over $50</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="feature-item">
                <i className="bi bi-shield-check display-4 mb-3"></i>
                <h5>Secure Payment</h5>
                <p>100% secure checkout</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="feature-item">
                <i className="bi bi-arrow-clockwise display-4 mb-3"></i>
                <h5>Easy Returns</h5>
                <p>30 day return policy</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="feature-item">
                <i className="bi bi-headset display-4 mb-3"></i>
                <h5>24/7 Support</h5>
                <p>Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">What Our Customers Say</h2>
            <p className="lead text-muted">Real reviews from real customers</p>
          </div>
          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-md-4">
                <div className="card testimonial-card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning"></i>
                      ))}
                    </div>
                    <p className="card-text mb-4">"{testimonial.content}"</p>
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        src={testimonial.avatar}
                        className="rounded-circle me-3"
                        alt={testimonial.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                      <div className="text-start">
                        <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h3 className="fw-bold mb-3">Stay Updated</h3>
              <p className="text-muted mb-4">Subscribe to our newsletter for the latest products and exclusive offers</p>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                />
                <button className="btn btn-primary" type="button">
                  Subscribe
                </button>
              </div>
              <small className="text-muted">We respect your privacy. Unsubscribe at any time.</small>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .category-card {
          transition: transform 0.3s ease;
        }
        .category-card:hover {
          transform: translateY(-5px);
        }
        .product-card {
          transition: transform 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .feature-item {
          transition: transform 0.3s ease;
        }
        .feature-item:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default Home;

