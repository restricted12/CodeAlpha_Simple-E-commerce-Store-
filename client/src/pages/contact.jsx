import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
//   FaTelephone,
  FaCheckCircle,
  FaMapPin
} from 'react-icons/fa';
import '../App.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt size={24} />,
      title: "Visit Us",
      details: [
        "123 Commerce Street",
        "Tech City, TC 12345",
        "United States"
      ]
    },
    {
      icon: <FaPhone size={24} />,
      title: "Call Us",
      details: [
        "+1 (555) 123-4567",
        "+1 (555) 987-6543",
        "Mon-Fri: 9AM-6PM EST"
      ]
    },
    {
      icon: <FaEnvelope size={24} />,
      title: "Email Us",
      details: [
        "hello@codealpha.com",
        "support@codealpha.com",
        "sales@codealpha.com"
      ]
    }
  ];

  const faqs = [
    {
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'Order History' section, or by using the tracking number sent to your email."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in original condition with all packaging intact. Some items may have different return terms."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can check shipping options during checkout."
    },
    {
      question: "How can I change or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placement. Contact our customer service team immediately for assistance."
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero py-5 bg-primary text-white">
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">Get in Touch</h1>
            <p className="lead mb-0">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="contact-main py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="contact-form-card p-4 bg-white rounded-3 shadow-sm">
                <h2 className="fw-bold mb-4">Send us a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <FaCheckCircle className="me-2" />
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                    <button type="button" className="btn-close" onClick={() => setSubmitStatus(null)}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="subject" className="form-label fw-semibold">
                        Subject *
                      </label>
                      <select
                        className="form-select form-select-lg"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Support</option>
                        <option value="returns">Returns & Refunds</option>
                        <option value="technical">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label fw-semibold">
                        Message *
                      </label>
                      <textarea
                        className="form-control form-control-lg"
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg px-5"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaEnvelope className="me-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="contact-info">
                <h3 className="fw-bold mb-4">Contact Information</h3>
                
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-item mb-4">
                    <div className="d-flex align-items-start">
                      <div className="contact-icon me-3">
                        {info.icon}
                      </div>
                      <div>
                        <h5 className="fw-bold mb-2">{info.title}</h5>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted mb-1">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Social Media */}
                <div className="social-media mt-5">
                  <h5 className="fw-bold mb-3">Follow Us</h5>
                  <div className="d-flex gap-2">
                    <a href="#" className="btn btn-outline-primary">
                      <FaFacebook size={16} />
                    </a>
                    <a href="#" className="btn btn-outline-primary">
                      <FaTwitter size={16} />
                    </a>
                    <a href="#" className="btn btn-outline-primary">
                      <FaInstagram size={16} />
                    </a>
                    <a href="#" className="btn btn-outline-primary">
                      <FaLinkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Frequently Asked Questions</h2>
            <p className="lead text-muted">Find answers to common questions</p>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {faqs.map((faq, index) => (
                  <div key={index} className="accordion-item border-0 mb-3 shadow-sm">
                    <h2 className="accordion-header" id={`faq-${index}`}>
                      <button
                        className="accordion-button collapsed fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-collapse-${index}`}
                        aria-expanded="false"
                        aria-controls={`faq-collapse-${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`faq-collapse-${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`faq-${index}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body text-muted">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">Visit Our Store</h2>
              <p className="lead mb-4">
                Come visit us in person and experience our products firsthand. 
                Our friendly staff is always ready to help you find exactly what you're looking for.
              </p>
              <div className="store-hours">
                <h5 className="fw-bold mb-3">Store Hours</h5>
                <div className="row">
                  <div className="col-6">
                    <p className="mb-1"><strong>Monday - Friday:</strong></p>
                    <p className="mb-1"><strong>Saturday:</strong></p>
                    <p className="mb-1"><strong>Sunday:</strong></p>
                  </div>
                  <div className="col-6">
                    <p className="mb-1">9:00 AM - 8:00 PM</p>
                    <p className="mb-1">10:00 AM - 6:00 PM</p>
                    <p className="mb-1">12:00 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="map-placeholder bg-light rounded-3 p-5 text-center">
                <FaMapPin size={64} className="text-muted mb-3" />
                <h5 className="fw-bold">Interactive Map</h5>
                <p className="text-muted mb-0">
                  Map integration would go here showing our store location
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="display-5 fw-bold mb-3">Need Immediate Help?</h2>
          <p className="lead mb-4">
            Our customer support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="tel:+15551234567" className="btn btn-light btn-lg">
              {/* <FaTelephone className="me-2" /> */}
              Call Now
            </a>
            <a href="mailto:support@codealpha.com" className="btn btn-outline-light btn-lg">
              <FaEnvelope className="me-2" />
              Email Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
