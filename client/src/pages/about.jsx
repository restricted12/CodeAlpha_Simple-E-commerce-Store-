import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaHeadset
} from 'react-icons/fa';
import '../App.css';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Passionate about creating exceptional shopping experiences for customers worldwide.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@codealpha.com"
      }
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Leading our technology initiatives to build the most innovative e-commerce platform.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mike@codealpha.com"
      }
    },
    {
      name: "Emily Davis",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Creating beautiful, intuitive user experiences that delight our customers.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@codealpha.com"
      }
    },
    {
      name: "David Rodriguez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Ensuring seamless operations and exceptional customer service delivery.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david@codealpha.com"
      }
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Products" },
    { number: "24/7", label: "Support" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Customer First",
      description: "Every decision we make is centered around providing the best experience for our customers."
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "We constantly push boundaries to bring you the latest and greatest products and services."
    },
    {
      icon: "🤝",
      title: "Trust & Transparency",
      description: "We believe in building lasting relationships through honest and transparent communication."
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description: "Committed to eco-friendly practices and supporting sustainable product choices."
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">About CodeAlpha Store</h1>
              <p className="lead mb-4">
                We're passionate about bringing you the best products from around the world, 
                delivered right to your doorstep with exceptional service and care.
              </p>
              <p className="mb-4">
                Founded in 2020, CodeAlpha Store has grown from a small startup to one of the 
                most trusted online shopping destinations. Our mission is to make quality products 
                accessible to everyone while providing an unmatched shopping experience.
              </p>
              <Link to="/products" className="btn btn-primary btn-lg">
                Explore Our Products
              </Link>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
                alt="About CodeAlpha Store" 
                className="img-fluid rounded-3 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5 bg-primary text-white">
        <div className="container">
          <div className="row text-center">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-3 col-6 mb-4">
                <div className="stat-item">
                  <h2 className="display-4 fw-bold mb-2">{stat.number}</h2>
                  <p className="mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Our Values</h2>
            <p className="lead text-muted">The principles that guide everything we do</p>
          </div>
          <div className="row g-4">
            {values.map((value, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="value-card text-center p-4 h-100">
                  <div className="value-icon mb-3">
                    <span className="display-4">{value.icon}</span>
                  </div>
                  <h4 className="fw-bold mb-3">{value.title}</h4>
                  <p className="text-muted mb-0">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Meet Our Team</h2>
            <p className="lead text-muted">The passionate people behind CodeAlpha Store</p>
          </div>
          <div className="row g-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="team-card text-center">
                  <div className="team-image mb-3">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="rounded-circle img-fluid"
                      style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                  </div>
                  <h4 className="fw-bold mb-1">{member.name}</h4>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-muted mb-3">{member.bio}</p>
                  <div className="team-social">
                    <a href={member.social.linkedin} className="btn btn-outline-primary btn-sm me-2">
                      <FaLinkedin size={16} />
                    </a>
                    <a href={member.social.twitter} className="btn btn-outline-primary btn-sm me-2">
                      <FaTwitter size={16} />
                    </a>
                    <a href={`mailto:${member.social.email}`} className="btn btn-outline-primary btn-sm">
                      <FaEnvelope size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
                alt="Our Story" 
                className="img-fluid rounded-3 shadow"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">Our Story</h2>
              <p className="lead mb-4">
                It all started with a simple idea: make online shopping better for everyone.
              </p>
              <p className="mb-3">
                In 2020, our founders noticed that many online stores were complex, 
                confusing, and didn't prioritize customer experience. They decided to 
                change that by creating CodeAlpha Store - a platform that puts customers first.
              </p>
              <p className="mb-3">
                Today, we're proud to serve thousands of customers worldwide, offering 
                everything from the latest electronics to fashion essentials, all while 
                maintaining the same commitment to quality and service that we started with.
              </p>
              <p className="mb-4">
                Our journey is far from over. We're constantly evolving, learning from 
                our customers, and finding new ways to make your shopping experience even better.
              </p>
              <Link to="/contact" className="btn btn-outline-primary btn-lg">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-primary text-white">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="feature-item">
                <FaTruck size={48} className="mb-3" />
                <h5>Free Shipping</h5>
                <p>On orders over $50</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="feature-item">
                <FaShieldAlt size={48} className="mb-3" />
                <h5>Secure Payment</h5>
                <p>100% secure checkout</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="feature-item">
                <FaUndo size={48} className="mb-3" />
                <h5>Easy Returns</h5>
                <p>30 day return policy</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="feature-item">
                <FaHeadset size={48} className="mb-3" />
                <h5>24/7 Support</h5>
                <p>Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="display-5 fw-bold mb-3">Ready to Start Shopping?</h2>
          <p className="lead mb-4">
            Join thousands of satisfied customers who trust CodeAlpha Store for their shopping needs.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/products" className="btn btn-light btn-lg">
              Browse Products
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
