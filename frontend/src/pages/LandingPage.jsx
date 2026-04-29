import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaHeart, FaCrown, FaMagic, FaPalette, FaRocket, FaShieldAlt,
  FaStar, FaCheck, FaArrowRight, FaPlay, FaQuoteLeft, FaUser,
  FaEnvelope, FaLock, FaGoogle, FaFacebook, FaApple, FaTimes,
  FaHome, FaImages, FaGem, FaComments, FaPhone, FaInfoCircle,
  FaBars, FaApplePay, FaCcVisa, FaCcMastercard, FaCcAmex,
  FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaAndroid, FaApple
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  // Section refs for scroll spy
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const templatesRef = useRef(null);
  const pricingRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    features: featuresRef,
    templates: templatesRef,
    pricing: pricingRef,
    testimonials: testimonialsRef,
    contact: contactRef,
  };

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      // Header background change
      setScrolled(window.scrollY > 50);

      // Find active section based on scroll position
      const scrollPosition = window.scrollY + 200; // offset for header

      for (const [key, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(key);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => document.body.classList.remove('sidebar-open');
  }, [mobileSidebarOpen]);

  // Scroll to section handler
  const scrollToSection = (section) => {
    setActiveSection(section);
    const ref = sectionRefs[section];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileSidebarOpen(false); // close mobile menu after click
  };

  // Template data
  const templates = [
    { id: 1, name: 'Classic Elegance', category: 'classic', price: 'Free', rating: 4.8, image: '/templates/classic.jpg', popular: true },
    { id: 2, name: 'Modern Minimal', category: 'modern', price: 'Free', rating: 4.6, image: '/templates/modern.jpg' },
    { id: 3, name: 'Romantic Rose', category: 'romantic', price: 'Free', rating: 4.9, image: '/templates/romantic.jpg', hot: true },
    { id: 4, name: 'Traditional Indian', category: 'traditional', price: 'Premium', rating: 4.7, image: '/templates/traditional.jpg' },
    { id: 5, name: 'Beach Paradise', category: 'beach', price: 'Free', rating: 4.5, image: '/templates/beach.jpg' },
    { id: 6, name: 'Luxury Gold', category: 'luxury', price: 'Premium', rating: 5.0, image: '/templates/luxury.jpg', featured: true },
  ];

  const filteredTemplates = filterCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === filterCategory);

  // Pricing plans
  const pricingPlans = [
    { name: 'Basic', price: { monthly: 0, yearly: 0 }, features: ['3 Invitations', 'Basic Templates', 'Email Support', 'Standard RSVP'], icon: '🎁', recommended: false },
    { name: 'Pro', price: { monthly: 19, yearly: 190 }, features: ['Unlimited Invitations', 'All Templates', 'Priority Support', 'Custom Domain', 'Analytics Dashboard', 'AI Content Generator'], icon: '💎', recommended: true },
    { name: 'Enterprise', price: { monthly: 49, yearly: 490 }, features: ['Everything in Pro', 'Dedicated Manager', 'API Access', 'White Label', 'SLA Guarantee'], icon: '👑', recommended: false },
  ];

  // Testimonials
  const testimonials = [
    { id: 1, name: 'Priya & Raj', role: 'Wedding on Dec 2024', content: 'The AI invitation creator saved us so much time! The templates are gorgeous and our guests loved the digital invites.', rating: 5, image: '/avatars/priya.jpg' },
    { id: 2, name: 'Michael & Sarah', role: 'Wedding on March 2025', content: 'Professional, elegant, and easy to use. The RSVP tracking feature is a lifesaver. Highly recommend!', rating: 5, image: '/avatars/michael.jpg' },
    { id: 3, name: 'Anjali & Vikram', role: 'Wedding on Feb 2025', content: 'Beautiful designs and excellent support. Our wedding website looked stunning on all devices.', rating: 5, image: '/avatars/anjali.jpg' },
  ];

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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

      {/* Navigation */}
      <nav className={`premium-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            <FaHeart className="logo-icon" />
            <span className="logo-text">Wedding<span className="text-gold">Invite</span></span>
            <span className="logo-badge">Premium</span>
          </div>

          {/* Desktop Menu */}
          <div className="nav-menu">
            <a className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</a>
            <a className={activeSection === 'features' ? 'active' : ''} onClick={() => scrollToSection('features')}>Features</a>
            <a className={activeSection === 'templates' ? 'active' : ''} onClick={() => scrollToSection('templates')}>Templates</a>
            <a className={activeSection === 'pricing' ? 'active' : ''} onClick={() => scrollToSection('pricing')}>Pricing</a>
            <a className={activeSection === 'testimonials' ? 'active' : ''} onClick={() => scrollToSection('testimonials')}>Testimonials</a>
            <a className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</a>
          </div>

          <div className="nav-buttons desktop-only">
            {user ? (
              <Link to="/dashboard" className="btn-premium-glow">
                <FaCrown /> Dashboard
              </Link>
            ) : (
              <>
                <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} className="btn-outline-premium">
                  Sign In
                </button>
                <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }} className="btn-premium-glow">
                  Get Started <FaArrowRight />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={() => setMobileSidebarOpen(true)}>
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div className={`mobile-sidebar-overlay ${mobileSidebarOpen ? 'active' : ''}`} onClick={() => setMobileSidebarOpen(false)}></div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header-premium">
          <div className="header-glow"></div>
          <div className="header-content-premium">
            <div className="user-profile-premium">
              <div className="avatar-ring-premium">
                <div className="avatar-premium">
                  {user ? (
                    <span className="avatar-text-premium">{user.name?.charAt(0) || 'U'}</span>
                  ) : (
                    <FaUser />
                  )}
                </div>
                <div className="status-dot-premium"></div>
              </div>
              <div className="user-greeting-premium">
                <span className="greeting-premium">Welcome to</span>
                <span className="username-premium">Wedding<span className="gold-premium">Invite</span></span>
              </div>
            </div>
            <button className="close-btn-premium" onClick={() => setMobileSidebarOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="header-decoration">
            <div className="decoration-line"></div>
          </div>
        </div>

        <div className="mobile-nav-container-premium">
          <div className="mobile-nav-premium">
            <div className={`nav-link-premium ${activeSection === 'home' ? 'active' : ''}`} onClick={() => scrollToSection('home')}>
              <div className="nav-icon-premium"><FaHome /></div>
              <span className="nav-text-premium">Home</span>
              {activeSection === 'home' && <div className="nav-active-dot"></div>}
            </div>
            <div className={`nav-link-premium ${activeSection === 'features' ? 'active' : ''}`} onClick={() => scrollToSection('features')}>
              <div className="nav-icon-premium"><FaGem /></div>
              <span className="nav-text-premium">Features</span>
              {activeSection === 'features' && <div className="nav-active-dot"></div>}
            </div>
            <div className={`nav-link-premium ${activeSection === 'templates' ? 'active' : ''}`} onClick={() => scrollToSection('templates')}>
              <div className="nav-icon-premium"><FaImages /></div>
              <span className="nav-text-premium">Templates</span>
              {activeSection === 'templates' && <div className="nav-active-dot"></div>}
            </div>
            <div className={`nav-link-premium ${activeSection === 'pricing' ? 'active' : ''}`} onClick={() => scrollToSection('pricing')}>
              <div className="nav-icon-premium"><FaCrown /></div>
              <span className="nav-text-premium">Pricing</span>
              {activeSection === 'pricing' && <div className="nav-active-dot"></div>}
            </div>
            <div className={`nav-link-premium ${activeSection === 'testimonials' ? 'active' : ''}`} onClick={() => scrollToSection('testimonials')}>
              <div className="nav-icon-premium"><FaComments /></div>
              <span className="nav-text-premium">Testimonials</span>
              {activeSection === 'testimonials' && <div className="nav-active-dot"></div>}
            </div>
            <div className={`nav-link-premium ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => scrollToSection('contact')}>
              <div className="nav-icon-premium"><FaPhone /></div>
              <span className="nav-text-premium">Contact</span>
              {activeSection === 'contact' && <div className="nav-active-dot"></div>}
            </div>
          </div>
        </div>

        <div className="mobile-footer-premium">
          <div className="footer-divider"></div>
          <div className="action-buttons-premium">
            {user ? (
              <Link to="/dashboard" className="action-btn-premium dashboard-btn" onClick={() => setMobileSidebarOpen(false)}>
                <FaCrown /> Dashboard <FaArrowRight className="btn-arrow" />
              </Link>
            ) : (
              <>
                <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); setMobileSidebarOpen(false); }} className="action-btn-premium signin-btn">
                  <FaUser /> Sign In
                </button>
                <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); setMobileSidebarOpen(false); }} className="action-btn-premium getstarted-btn">
                  <FaMagic /> Get Started <FaArrowRight className="btn-arrow" />
                </button>
              </>
            )}
          </div>
          <div className="footer-branding">
            <div className="branding-text">
              <FaHeart className="branding-icon" />
              <span>WeddingInvite</span>
            </div>
            <div className="version-text">v3.0 Premium</div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={homeRef} className="premium-hero">
        <div className="hero-container">
          <div className="hero-badge animate-pulse-glow">
            <FaStar /> AI-Powered Wedding Invitations
          </div>
          <h1 className="hero-title">
            Create <span className="gradient-text-gold">Stunning</span><br />
            Wedding Invitations
          </h1>
          <p className="hero-subtitle">
            Beautiful digital invitations, RSVP tracking, wedding websites, and more. 
            Used by 50,000+ happy couples worldwide.
          </p>

          <div className="hero-stats-grid">
            <div className="hero-stat-item"><div className="hero-stat-icon"><FaHeart /></div><div className="hero-stat-number">50K+</div><div className="hero-stat-label">Couples</div></div>
            <div className="hero-stat-item"><div className="hero-stat-icon"><FaMagic /></div><div className="hero-stat-number">1M+</div><div className="hero-stat-label">Invitations</div></div>
            <div className="hero-stat-item"><div className="hero-stat-icon"><FaStar /></div><div className="hero-stat-number">4.9</div><div className="hero-stat-label">Rating</div></div>
            <div className="hero-stat-item"><div className="hero-stat-icon"><FaRocket /></div><div className="hero-stat-number">98%</div><div className="hero-stat-label">Satisfaction</div></div>
            <div className="hero-stat-item"><div className="hero-stat-icon"><FaShieldAlt /></div><div className="hero-stat-number">24/7</div><div className="hero-stat-label">Support</div></div>
            <div className="hero-stat-item"><div className="hero-stat-icon"><FaCrown /></div><div className="hero-stat-number">100+</div><div className="hero-stat-label">Templates</div></div>
          </div>

          <div className="hero-buttons">
            <Link to="/create" className="btn-hero-primary">
              <FaMagic /> Create Free Invitation
            </Link>
            <button className="btn-hero-secondary" onClick={() => scrollToSection('templates')}>
              View Templates <FaArrowRight />
            </button>
          </div>

          <div className="hero-trust-badges">
            <span><FaCheck /> No credit card required</span>
            <span><FaShieldAlt /> 30-day money back</span>
            <span><FaStar /> Trusted by 50k+ couples</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="premium-features fade-on-scroll">
        <div className="container">
          <div className="section-header-premium">
            <span className="section-badge">Why Choose Us</span>
            <h2>Everything You Need <span className="gradient-text-gold">For Your Big Day</span></h2>
            <p>Powerful features to make your wedding invitation process seamless and magical</p>
          </div>
          <div className="features-grid-premium">
            {[
              { icon: <FaMagic />, title: 'AI Content Generator', desc: 'Let AI write beautiful invitation text based on your story', color: '#8b5cf6', tag: 'AI' },
              { icon: <FaPalette />, title: '100+ Templates', desc: 'Stunning designs for every wedding theme and style', color: '#FF3366', tag: 'Popular' },
              { icon: <FaRocket />, title: 'Real-time RSVP', desc: 'Track guest responses instantly with analytics', color: '#10b981', tag: 'New' },
              { icon: <FaHeart />, title: 'Digital Wedding Website', desc: 'Create a beautiful wedding site in minutes', color: '#f59e0b', tag: 'Hot' },
              { icon: <FaCrown />, title: 'Premium Support', desc: '24/7 dedicated support for all your needs', color: '#FFD700', tag: '' },
              { icon: <FaShieldAlt />, title: 'Secure & Private', desc: 'Your data is encrypted and safe with us', color: '#3b82f6', tag: '' },
            ].map((feat, idx) => (
              <motion.div key={idx} className="feature-card-premium" style={{ '--feature-color': feat.color }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
                <div className="feature-icon-premium">{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
                {feat.tag && <div className={`feature-tag ${feat.tag.toLowerCase()}`}>{feat.tag}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section ref={templatesRef} className="premium-templates fade-on-scroll">
        <div className="container">
          <div className="section-header-premium">
            <span className="section-badge">Beautiful Designs</span>
            <h2>Choose Your Perfect <span className="gradient-text-gold">Wedding Template</span></h2>
            <p>Professionally designed templates that your guests will love</p>
          </div>

          <div className="templates-filter">
            {['all', 'classic', 'modern', 'romantic', 'traditional', 'beach', 'luxury'].map(cat => (
              <button key={cat} className={`filter-btn ${filterCategory === cat ? 'active' : ''}`} onClick={() => setFilterCategory(cat)}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="templates-slider">
            {filteredTemplates.map((template) => (
              <motion.div key={template.id} className="template-card-premium" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} viewport={{ once: true }}>
                <div className="template-image-premium">
                  <img src={template.image} alt={template.name} />
                  <div className="template-overlay-premium">
                    <span className="template-price">{template.price}</span>
                    <button className="btn-preview" onClick={() => navigate('/create')}>Preview</button>
                  </div>
                  {(template.popular || template.hot || template.featured) && (
                    <div className="template-badge">{template.popular ? '🔥 Popular' : template.hot ? '⚡ Hot' : '✨ Featured'}</div>
                  )}
                </div>
                <div className="template-info-premium">
                  <h3>{template.name}</h3>
                  <p>Wedding Invitation</p>
                  <div className="template-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(template.rating) ? 'star-filled' : 'star-empty'}>★</span>
                    ))}
                    <span style={{ marginLeft: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>({template.rating})</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="premium-pricing fade-on-scroll">
        <div className="container">
          <div className="section-header-premium">
            <span className="section-badge">Simple Pricing</span>
            <h2>Choose the Plan That's <span className="gradient-text-gold">Right for You</span></h2>
            <p>No hidden fees. Cancel anytime.</p>
          </div>

          <div className="billing-toggle">
            <button className={billingPeriod === 'monthly' ? 'active' : ''} onClick={() => setBillingPeriod('monthly')}>
              Monthly
            </button>
            <button className={billingPeriod === 'yearly' ? 'active' : ''} onClick={() => setBillingPeriod('yearly')}>
              Yearly <span className="save-badge">Save 20%</span>
            </button>
          </div>

          <div className="pricing-grid-premium">
            {pricingPlans.map((plan, idx) => (
              <motion.div key={idx} className={`pricing-card-premium ${plan.recommended ? 'recommended' : ''}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
                {plan.recommended && <div className="recommended-badge">⭐ Most Popular</div>}
                <div className="plan-icon">{plan.icon}</div>
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  {plan.price[billingPeriod] === 0 ? (
                    <span className="price-free">Free Forever</span>
                  ) : (
                    <>
                      <span className="currency">$</span>
                      <span className="amount">{plan.price[billingPeriod]}</span>
                      <span className="period">/{billingPeriod === 'monthly' ? 'mo' : 'year'}</span>
                    </>
                  )}
                </div>
                <ul className="plan-features-premium">
                  {plan.features.map((feature, i) => (
                    <li key={i}><FaCheck className="check-icon" /> {feature}</li>
                  ))}
                </ul>
                <button className="plan-btn" onClick={() => { if (!user) { setAuthMode('signup'); setShowAuthModal(true); } else { navigate('/create'); } }}>
                  {plan.price[billingPeriod] === 0 ? 'Get Started' : 'Choose Plan'} <FaArrowRight />
                </button>
              </motion.div>
            ))}
          </div>
          <p className="pricing-note">* All plans include 14-day free trial. No commitment required.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="premium-testimonials fade-on-scroll">
        <div className="container">
          <div className="section-header-premium">
            <span className="section-badge">Love Stories</span>
            <h2>Trusted by <span className="gradient-text-gold">Thousands of Couples</span></h2>
            <p>See what our happy customers have to say</p>
          </div>

          <div className="testimonials-slider-container">
            <button className="slider-nav" onClick={prevTestimonial}><FaArrowLeft /></button>
            <div className="testimonials-slider-wrapper">
              <div className="testimonials-slider" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="testimonial-content">
                      <FaQuoteLeft className="quote-icon" />
                      <p>{testimonial.content}</p>
                      <div className="testimonial-rating">
                        {[...Array(5)].map((_, i) => <span key={i} className="star-filled">★</span>)}
                      </div>
                    </div>
                    <div className="testimonial-author">
                      <img src={testimonial.image} alt={testimonial.name} />
                      <div>
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="slider-nav" onClick={nextTestimonial}><FaArrowRight /></button>
          </div>
          <div className="slider-dots">
            {testimonials.map((_, idx) => (
              <button key={idx} className={`slider-dot ${testimonialIndex === idx ? 'active' : ''}`} onClick={() => setTestimonialIndex(idx)}></button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section ref={contactRef} className="premium-cta fade-on-scroll">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to Create Your <span className="gradient-text-gold">Perfect Invitation?</span></h2>
            <p>Join 50,000+ happy couples and start creating beautiful wedding invitations today.</p>
            <div className="cta-buttons">
              <Link to="/create" className="btn-cta-primary">
                Create Free Invitation <FaMagic />
              </Link>
              <button className="btn-cta-secondary" onClick={() => scrollToSection('templates')}>
                Browse Templates <FaArrowRight />
              </button>
            </div>
            <div className="cta-features">
              <span><FaCheck /> Free forever plan</span>
              <span><FaShieldAlt /> 30-day money back</span>
              <span><FaStar /> No credit card required</span>
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
                <span className="logo-text">Wedding<span className="text-gold">Invite</span></span>
              </div>
              <p>Create stunning digital wedding invitations, manage RSVPs, and build your wedding website all in one place.</p>
              <div className="app-badges">
                <span>Download App</span>
                <div className="badges">
                  <button className="app-badge"><FaApple /> App Store</button>
                  <button className="app-badge"><FaAndroid /> Google Play</button>
                </div>
              </div>
              <div className="social-links">
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaLinkedin /></a>
                <a href="#"><FaYoutube /></a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Product</h4>
              <ul><li>Features</li><li>Templates</li><li>Pricing</li><li>AI Generator</li><li>Integrations</li></ul>
            </div>
            <div className="footer-links">
              <h4>Resources</h4>
              <ul><li>Blog</li><li>Help Center</li><li>Wedding Guide</li><li>API Docs</li><li>Status</li></ul>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <ul><li>About Us</li><li>Careers</li><li>Press</li><li>Contact</li><li>Partners</li></ul>
            </div>
            <div className="footer-links">
              <h4>Legal</h4>
              <ul><li>Privacy Policy</li><li>Terms of Service</li><li>Cookie Policy</li><li>GDPR</li><li>Security</li></ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2025 WeddingInvite. All rights reserved.</div>
            <div className="payment-methods">
              <span>Secure payments</span>
              <div className="payment-icons">
                <FaCcVisa />< FaCcMastercard />< FaCcAmex />< FaApplePay />
              </div>
            </div>
            <div>Made with <span className="footer-heart">❤️</span> for couples worldwide</div>
          </div>
        </div>
      </footer>

      {/* Auth Modal (Simplified - you can replace with your actual modal) */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div className="auth-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAuthModal(false)}>
            <motion.div className="auth-modal" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} onClick={(e) => e.stopPropagation()}>
              <button className="auth-modal-close" onClick={() => setShowAuthModal(false)}><FaTimes /></button>
              <h2>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
              <p>{authMode === 'login' ? 'Sign in to continue' : 'Start creating beautiful invitations'}</p>
              <form onSubmit={(e) => { e.preventDefault(); toast.success('Demo - Redirecting...'); navigate('/dashboard'); setShowAuthModal(false); }}>
                <input type="email" placeholder="Email address" required />
                <input type="password" placeholder="Password" required />
                {authMode === 'signup' && <input type="text" placeholder="Full name" required />}
                <button type="submit" className="auth-submit">{authMode === 'login' ? 'Sign In' : 'Get Started'}</button>
              </form>
              <div className="auth-divider"><span>or</span></div>
              <div className="social-auth">
                <button><FaGoogle /> Google</button>
                <button><FaFacebook /> Facebook</button>
              </div>
              <p className="auth-switch">
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <span onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
                  {authMode === 'login' ? 'Sign up' : 'Sign in'}
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        /* Include all the CSS you provided, plus the updated active styles below */
        /* ... (paste entire CSS from user, with the fix below) ... */
        
        /* FIX: Ensure active class works for all nav links */
        .nav-menu a.active {
          color: #FFD700;
        }
        
        .nav-menu a.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          right: 0;
          height: 2px;
          background: #FFD700;
          border-radius: 2px;
        }
        
        /* Mobile sidebar active styles */
        .nav-link-premium.active {
          background: linear-gradient(90deg, rgba(255, 215, 0, 0.15), transparent);
          color: #FFD700;
          border-left: 3px solid #FFD700;
        }
        
        .nav-link-premium.active .nav-icon-premium {
          background: rgba(255, 215, 0, 0.15);
          color: #FFD700;
        }
        
        /* Ensure scroll margin for fixed header */
        section {
          scroll-margin-top: 80px;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;