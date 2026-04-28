import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaQrcode, FaEnvelope, FaUsers, FaImages, 
  FaChartLine, FaHeart, FaCheckCircle, FaMobileAlt,
  FaGem, FaStar, FaCrown, FaArrowRight, FaPlay,
  FaInstagram, FaFacebook, FaTwitter, FaLinkedin,
  FaShieldAlt, FaRocket, FaPaintBrush,
  FaBars, FaTimes, FaVideo, FaHeadset,
  FaRobot, FaWhatsapp, FaApple, FaGoogle,
  FaGlobe, FaPoll, FaCcVisa, FaCcMastercard, FaCcPaypal, FaRupeeSign,
  FaChevronLeft, FaChevronRight, FaUser, FaSignInAlt,
  FaGift
} from 'react-icons/fa';
import '../styles/globals.css';
import '../styles/animations.css';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Create refs for sections
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const templatesRef = useRef(null);
  const pricingRef = useRef(null);
  const testimonialsRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    features: featuresRef,
    templates: templatesRef,
    pricing: pricingRef,
    testimonials: testimonialsRef
  };

  const testimonialsData = [
    { id: 1, name: 'Priya & Rajesh', wedding: 'Mumbai, Dec 2024', text: 'WedCard Pro made our wedding planning so easy! The QR code feature was a hit among guests.', rating: 5, image: 'https://randomuser.me/api/portraits/women/1.jpg', location: 'Mumbai' },
    { id: 2, name: 'Anjali & Vikram', wedding: 'Delhi, Jan 2025', text: 'Incredible platform! The analytics helped us track RSVPs perfectly.', rating: 5, image: 'https://randomuser.me/api/portraits/women/2.jpg', location: 'Delhi' },
    { id: 3, name: 'Neha & Arjun', wedding: 'Bangalore, Feb 2025', text: 'Best investment for our wedding. The guest management feature is a lifesaver!', rating: 5, image: 'https://randomuser.me/api/portraits/women/3.jpg', location: 'Bangalore' },
    { id: 4, name: 'Sneha & Vikas', wedding: 'Pune, Mar 2025', text: 'Beautiful templates and easy to use interface.', rating: 5, image: 'https://randomuser.me/api/portraits/women/4.jpg', location: 'Pune' },
    { id: 5, name: 'Ritu & Aman', wedding: 'Jaipur, Apr 2025', text: 'The QR code feature was amazing! Our guests loved it.', rating: 5, image: 'https://randomuser.me/api/portraits/women/5.jpg', location: 'Jaipur' },
    { id: 6, name: 'Kavita & Sanjay', wedding: 'Chennai, May 2025', text: 'Excellent customer support and beautiful designs.', rating: 5, image: 'https://randomuser.me/api/portraits/women/6.jpg', location: 'Chennai' }
  ];

  const itemsPerPage = 3;
  const totalSlides = Math.ceil(testimonialsData.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleTestimonials = () => {
    const start = currentSlide * itemsPerPage;
    return testimonialsData.slice(start, start + itemsPerPage);
  };

  // Get user first name
  const getUserFirstName = () => {
    if (!user?.name) return null;
    return user.name.split(' ')[0];
  };

  // Improved scroll to section function
  const scrollToSection = (sectionId) => {
    // Close sidebar first
    setMobileMenuOpen(false);
    
    // Small delay to allow sidebar to close
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // Offset for fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  // Handle body scroll when sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('sidebar-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('sidebar-open');
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('sidebar-open');
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Check which section is in view
      const sections = ['home', 'features', 'templates', 'pricing', 'testimonials'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
      
      // Fade on scroll
      const fadeElements = document.querySelectorAll('.fade-on-scroll');
      fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: FaQrcode, title: 'Smart QR Codes', description: 'Dynamic QR codes with real-time tracking', color: '#FF3366', tag: 'New' },
    { icon: FaRobot, title: 'AI Designer', description: 'AI-powered invitation creation', color: '#9B59B6', tag: 'AI' },
    { icon: FaUsers, title: 'Guest Management', description: 'Smart guest management system', color: '#FF6B35', tag: 'Popular' },
    { icon: FaImages, title: 'Photo Gallery', description: 'HD photo albums with video', color: '#FFD700', tag: '' },
    { icon: FaWhatsapp, title: 'WhatsApp', description: 'Send invites via WhatsApp', color: '#25D366', tag: 'New' },
    { icon: FaChartLine, title: 'Analytics', description: 'Real-time RSVP tracking', color: '#00E5A0', tag: '' },
    { icon: FaMobileAlt, title: 'Mobile App', description: 'Native app experience', color: '#9B59B6', tag: '' },
    { icon: FaVideo, title: 'Live Streaming', description: 'Virtual wedding streaming', color: '#FF0000', tag: 'Hot' },
    { icon: FaShieldAlt, title: 'Security', description: 'Bank-grade encryption', color: '#3498DB', tag: '' },
    { icon: FaHeadset, title: '24/7 Support', description: 'Dedicated support team', color: '#00C9FF', tag: '' },
    { icon: FaPaintBrush, title: 'Custom Templates', description: 'Drag-drop editor', color: '#FF69B4', tag: '' },
    { icon: FaRocket, title: 'Fast Delivery', description: '99.9% uptime SLA', color: '#E74C3C', tag: '' }
  ];

  const templates = [
    { name: 'Royal Maharaja', style: 'Luxury Heritage', price: 'Premium', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', rating: 5, category: 'luxury' },
    { name: 'Modern Romance', style: 'Contemporary', price: 'Free', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400', rating: 4.8, category: 'modern' },
    { name: 'Golden Era', style: 'Vintage Luxury', price: 'Premium', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400', rating: 4.9, category: 'vintage' },
    { name: 'Beach Paradise', style: 'Destination', price: 'Free', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400', rating: 4.8, category: 'destination' },
    { name: 'Garden Elegance', style: 'Floral', price: 'Premium', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400', rating: 4.9, category: 'floral' },
    { name: 'Divine Blessings', style: 'Spiritual', price: 'Premium', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', rating: 4.7, category: 'spiritual' }
  ];

  const filteredTemplates = activeFilter === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeFilter);

  const plans = [
    {
      name: 'Silver',
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: FaGem,
      features: ['1 Digital Invitation', 'Up to 100 Guests', '5 Premium Templates', 'Basic QR Code', 'Email Support', 'Basic Analytics'],
      color: '#94A3B8',
      recommended: false,
      buttonText: 'Start Free'
    },
    {
      name: 'Gold',
      monthlyPrice: 1999,
      yearlyPrice: 19190,
      icon: FaStar,
      features: ['Unlimited Invitations', 'Up to 1000 Guests', 'All 50+ Templates', 'Dynamic QR Codes', 'Priority Support 24/7', 'Advanced Analytics', 'Photo Gallery (10GB)', 'WhatsApp Integration'],
      color: '#FFD700',
      recommended: true,
      buttonText: 'Get Started'
    },
    {
      name: 'Platinum',
      monthlyPrice: 4999,
      yearlyPrice: 47990,
      icon: FaCrown,
      features: ['Unlimited Everything', 'Unlimited Guests', 'Custom Template Design', 'AI-Powered Features', 'Dedicated Account Manager', 'Real-time Analytics', 'Unlimited Gallery', 'API Access', 'White Label'],
      color: '#E5B8F4',
      recommended: false,
      buttonText: 'Contact Sales'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Couples', icon: FaHeart },
    { number: '2L+', label: 'Invitations Sent', icon: FaEnvelope },
    { number: '98%', label: 'RSVP Rate', icon: FaPoll },
    { number: '24/7', label: 'Support', icon: FaHeadset },
    { number: '500+', label: 'Templates', icon: FaPaintBrush },
    { number: '150+', label: 'Cities', icon: FaGlobe }
  ];

  return (
    <div className="landing-page-premium">
      {/* Animated Background */}
      <div className="premium-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* ==================== PREMIUM MOBILE SIDEBAR ==================== */}
      <div className={`mobile-sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      <div className={`mobile-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Premium Header with Gradient */}
        <div className="mobile-sidebar-header-premium">
          <div className="header-glow"></div>
          <div className="header-content-premium">
            <div className="user-profile-premium">
              <div className="avatar-ring-premium">
                <div className="avatar-premium">
                  {user ? (
                    <span className="avatar-text-premium">{getUserFirstName()?.charAt(0) || 'U'}</span>
                  ) : (
                    <FaUser />
                  )}
                </div>
                <div className="status-dot-premium"></div>
              </div>
              <div className="user-greeting-premium">
                {user ? (
                  <>
                    <span className="greeting-premium">Welcome back,</span>
                    <span className="username-premium">{getUserFirstName() || 'User'}</span>
                  </>
                ) : (
                  <>
                    <span className="greeting-premium">Welcome to</span>
                    <span className="brand-premium">Wed<span className="gold-premium">Card</span> Pro</span>
                  </>
                )}
              </div>
            </div>
            <button className="close-btn-premium" onClick={() => setMobileMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="header-decoration">
            <div className="decoration-line"></div>
          </div>
        </div>

        {/* Premium Navigation */}
        <div className="mobile-nav-container-premium">
          <nav className="mobile-nav-premium">
            <a onClick={() => scrollToSection('home')} className={`nav-link-premium ${activeSection === 'home' ? 'active' : ''}`}>
              <div className="nav-icon-premium">
                <FaHeart />
              </div>
              <span className="nav-text-premium">Home</span>
              {activeSection === 'home' && <div className="nav-active-dot"></div>}
            </a>
            <a onClick={() => scrollToSection('features')} className={`nav-link-premium ${activeSection === 'features' ? 'active' : ''}`}>
              <div className="nav-icon-premium">
                <FaStar />
              </div>
              <span className="nav-text-premium">Features</span>
              {activeSection === 'features' && <div className="nav-active-dot"></div>}
            </a>
            <a onClick={() => scrollToSection('templates')} className={`nav-link-premium ${activeSection === 'templates' ? 'active' : ''}`}>
              <div className="nav-icon-premium">
                <FaImages />
              </div>
              <span className="nav-text-premium">Templates</span>
              {activeSection === 'templates' && <div className="nav-active-dot"></div>}
            </a>
            <a onClick={() => scrollToSection('pricing')} className={`nav-link-premium ${activeSection === 'pricing' ? 'active' : ''}`}>
              <div className="nav-icon-premium">
                <FaRupeeSign />
              </div>
              <span className="nav-text-premium">Pricing</span>
              {activeSection === 'pricing' && <div className="nav-active-dot"></div>}
            </a>
            <a onClick={() => scrollToSection('testimonials')} className={`nav-link-premium ${activeSection === 'testimonials' ? 'active' : ''}`}>
              <div className="nav-icon-premium">
                <FaUsers />
              </div>
              <span className="nav-text-premium">Testimonials</span>
              {activeSection === 'testimonials' && <div className="nav-active-dot"></div>}
            </a>
          </nav>
        </div>

        {/* Premium Footer Actions */}
        <div className="mobile-footer-premium">
          <div className="footer-divider"></div>
          <div className="action-buttons-premium">
            {user ? (
              <Link to="/dashboard" className="action-btn-premium dashboard-btn" onClick={() => setMobileMenuOpen(false)}>
                <FaHeart />
                <span>Dashboard</span>
                <FaArrowRight className="btn-arrow" />
              </Link>
            ) : (
              <>
                <Link to="/login" className="action-btn-premium signin-btn" onClick={() => setMobileMenuOpen(false)}>
                  <FaSignInAlt />
                  <span>Sign In</span>
                </Link>
                <Link to="/login" className="action-btn-premium getstarted-btn" onClick={() => setMobileMenuOpen(false)}>
                  <FaGift />
                  <span>Get Started Free</span>
                  <FaArrowRight className="btn-arrow" />
                </Link>
              </>
            )}
          </div>
          <div className="footer-branding">
            <div className="branding-text">
              <FaHeart className="branding-icon" />
              <span>WedCard Pro</span>
            </div>
            <p className="version-text">v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className={`premium-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-glow">
              <FaHeart className="logo-icon" />
            </div>
            <span className="logo-text">Wed<span className="text-gold">Card</span> Pro</span>
            <span className="logo-badge">Premium</span>
          </div>
          
          <div className="nav-menu">
            <a onClick={() => scrollToSection('home')} className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</a>
            <a onClick={() => scrollToSection('features')} className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}>Features</a>
            <a onClick={() => scrollToSection('templates')} className={`nav-link ${activeSection === 'templates' ? 'active' : ''}`}>Templates</a>
            <a onClick={() => scrollToSection('pricing')} className={`nav-link ${activeSection === 'pricing' ? 'active' : ''}`}>Pricing</a>
            <a onClick={() => scrollToSection('testimonials')} className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}>Testimonials</a>
          </div>
          
          <div className="nav-buttons desktop-only">
            {user ? (
              <Link to="/dashboard" className="btn-premium-glow">
                <span>Dashboard</span>
                <FaArrowRight />
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-outline-premium">Sign In</Link>
                <Link to="/login" className="btn-premium-glow">
                  <span>Get Started</span>
                  <FaArrowRight />
                </Link>
              </>
            )}
          </div>
          
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={homeRef} className="premium-hero">
        <div className="hero-container">
          <div className="hero-badge animate-pulse-glow">
            <FaStar /> India's #1 Wedding Tech Platform 2025
          </div>
          <h1 className="hero-title">
            Create Stunning
            <span className="gradient-text-gold"> Digital Wedding</span>
            <span> Invitations</span>
          </h1>
          <p className="hero-subtitle">
            Join 50,000+ happy couples who transformed their wedding experience with 
            India's most advanced digital invitation platform.
          </p>
          
          <div className="hero-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="hero-stat-item">
                <stat.icon className="hero-stat-icon" />
                <div className="hero-stat-number">{stat.number}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="hero-buttons">
            <Link to={user ? "/dashboard" : "/login"} className="btn-hero-primary">
              Start Free Trial <FaArrowRight />
            </Link>
            <button className="btn-hero-secondary">
              <FaPlay /> Watch Demo
            </button>
          </div>
          
          <div className="hero-trust-badges">
            <span><FaCheckCircle /> No credit card</span>
            <span><FaCheckCircle /> Free 14-day trial</span>
            <span><FaCheckCircle /> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="premium-features fade-on-scroll">
        <div className="container">
          <div className="section-header-premium">
            <span className="section-badge">Powerful Features</span>
            <h2>Everything You Need for a <span className="gradient-text-gold">Perfect Wedding</span></h2>
            <p>Enterprise-grade features that make wedding planning effortless</p>
          </div>
          <div className="features-grid-premium">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-premium" style={{ '--feature-color': feature.color }}>
                <div className="feature-icon-premium">
                  <feature.icon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                {feature.tag && <span className={`feature-tag ${feature.tag.toLowerCase()}`}>{feature.tag}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" ref={templatesRef} className="premium-templates fade-on-scroll">
        <div className="container">
          <div className="section-header-premium">
            <span className="section-badge">Beautiful Designs</span>
            <h2>Choose from <span className="gradient-text-gold">500+ Templates</span></h2>
            <p>Professionally designed templates for every wedding style</p>
          </div>
          <div className="templates-filter">
            <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
            <button className={`filter-btn ${activeFilter === 'luxury' ? 'active' : ''}`} onClick={() => setActiveFilter('luxury')}>Luxury</button>
            <button className={`filter-btn ${activeFilter === 'modern' ? 'active' : ''}`} onClick={() => setActiveFilter('modern')}>Modern</button>
            <button className={`filter-btn ${activeFilter === 'destination' ? 'active' : ''}`} onClick={() => setActiveFilter('destination')}>Destination</button>
          </div>
          <div className="templates-slider">
            {filteredTemplates.map((template, index) => (
              <div key={index} className="template-card-premium">
                <div className="template-image-premium">
                  <img src={template.image} alt={template.name} />
                  <div className="template-overlay-premium">
                    <span className="template-price">{template.price}</span>
                    <button className="btn-preview">Preview</button>
                  </div>
                  {template.rating >= 4.8 && <div className="template-badge">Trending</div>}
                </div>
                <div className="template-info-premium">
                  <h3>{template.name}</h3>
                  <p>{template.style}</p>
                  <div className="template-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(template.rating) ? 'star-filled' : 'star-empty'} />
                    ))}
                    <span>{template.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className="premium-pricing fade-on-scroll">
        <div className="container">
          <div className="section-header-premium">
            <span className="section-badge">Simple Pricing</span>
            <h2>Choose the Perfect <span className="gradient-text-gold">Plan for You</span></h2>
            <p>No hidden fees. Cancel anytime.</p>
          </div>
          
          <div className="billing-toggle">
            <button className={billingCycle === 'monthly' ? 'active' : ''} onClick={() => setBillingCycle('monthly')}>Monthly</button>
            <button className={billingCycle === 'yearly' ? 'active' : ''} onClick={() => setBillingCycle('yearly')}>
              Yearly <span className="save-badge">Save 20%</span>
            </button>
          </div>
          
          <div className="pricing-grid-premium">
            {plans.map((plan, index) => {
              const currentPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
              const currentPeriod = billingCycle === 'monthly' ? 'month' : 'year';
              
              return (
                <div key={index} className={`pricing-card-premium ${plan.recommended ? 'recommended' : ''}`}>
                  {plan.recommended && <div className="recommended-badge">Most Popular</div>}
                  <div className="plan-icon" style={{ color: plan.color }}>
                    <plan.icon />
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    {currentPrice === 0 ? (
                      <span className="price-free">Free Forever</span>
                    ) : (
                      <>
                        <span className="currency">₹</span>
                        <span className="amount">{currentPrice.toLocaleString('en-IN')}</span>
                        <span className="period">/{currentPeriod}</span>
                      </>
                    )}
                  </div>
                  <ul className="plan-features-premium">
                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        <FaCheckCircle className="check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/login" className={`plan-btn ${plan.recommended ? 'btn-premium-glow' : 'btn-outline-premium'}`}>
                    {plan.buttonText} <FaArrowRight />
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="pricing-note">* All prices are in Indian Rupees (INR). GST extra as applicable.</p>
        </div>
      </section>

      {/* Testimonials Slider Section */}
      <section id="testimonials" ref={testimonialsRef} className="premium-testimonials fade-on-scroll">
        <div className="container">
          <div className="section-header-premium">
            <span className="section-badge">Love Stories</span>
            <h2>Trusted by <span className="gradient-text-gold">50,000+ Couples</span></h2>
            <p>Real experiences from real weddings across India</p>
          </div>
          
          <div className="testimonials-slider-container">
            <button className="slider-nav prev" onClick={prevSlide}>
              <FaChevronLeft />
            </button>
            
            <div className="testimonials-slider-wrapper">
              <div className="testimonials-slider">
                {getVisibleTestimonials().map((testimonial, index) => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="testimonial-content">
                      <FaHeart className="quote-icon" />
                      <p>"{testimonial.text}"</p>
                      <div className="testimonial-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="star-filled" />
                        ))}
                      </div>
                    </div>
                    <div className="testimonial-author">
                      <img src={testimonial.image} alt={testimonial.name} />
                      <div>
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.wedding} • {testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="slider-nav next" onClick={nextSlide}>
              <FaChevronRight />
            </button>
          </div>
          
          <div className="slider-dots">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="premium-cta fade-on-scroll">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to Create Your Dream Wedding Invitation?</h2>
            <p>Join 50,000+ couples who transformed their wedding experience</p>
            <div className="cta-buttons">
              <Link to={user ? "/dashboard" : "/login"} className="btn-cta-primary">
                Start Free Trial <FaArrowRight />
              </Link>
              <button className="btn-cta-secondary">
                <FaPlay /> Watch Demo
              </button>
            </div>
            <div className="cta-features">
              <span><FaCheckCircle /> No credit card</span>
              <span><FaCheckCircle /> Free 14-day trial</span>
              <span><FaCheckCircle /> Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="premium-footer">
        <div className="container">
          <div className="footer-grid-premium">
            <div className="footer-brand">
              <div className="footer-logo">
                <FaHeart className="logo-icon" />
                <span>Wed<span className="text-gold">Card</span> Pro</span>
              </div>
              <p>India's most advanced digital wedding invitation platform.</p>
              <div className="app-badges">
                <span>Download App</span>
                <div className="badges">
                  <button className="app-badge"><FaApple /> App Store</button>
                  <button className="app-badge"><FaGoogle /> Google Play</button>
                </div>
              </div>
              <div className="social-links">
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaLinkedin /></a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Product</h4>
              <ul>
                <li>Features</li>
                <li>Templates</li>
                <li>Pricing</li>
                <li>Demo</li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li>About Us</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Resources</h4>
              <ul>
                <li>Help Center</li>
                <li>Wedding Guide</li>
                <li>Webinars</li>
                <li>Community</li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Legal</h4>
              <ul>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Refund Policy</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 WedCard Pro. All rights reserved. Made with <FaHeart className="footer-heart" /> in India</p>
            <div className="payment-methods">
              <span>Secure payments by</span>
              <div className="payment-icons">
                <FaCcVisa />
                <FaCcMastercard />
                <FaCcPaypal />
                <FaRupeeSign />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;