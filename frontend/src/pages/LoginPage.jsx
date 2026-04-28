import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FaHeart, FaEnvelope, FaLock, FaUser, FaPhone, 
  FaArrowRight, FaEye, FaEyeSlash, FaCheckCircle, 
  FaSpinner, FaMagic, FaCopy, FaCheck, FaStar, FaKey,
  FaHome, FaArrowLeft, FaGoogle, FaFacebook, FaGithub
} from 'react-icons/fa';
import '../styles/globals.css';
import '../styles/animations.css';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState('form');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [otp, setOtp] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const API_URL = 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      setLoading(true);
      const success = await login(formData.email, formData.password);
      setLoading(false);
      if (success) {
        navigate('/dashboard');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill all required fields');
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
      
      setLoading(true);
      try {
        const response = await axios.post(`${API_URL}/auth/send-otp`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        });
        
        if (response.data.success) {
          setTempEmail(formData.email);
          setStep('otp');
          toast.success('OTP sent to your email! Please check your inbox.');
        } else {
          toast.error(response.data.message || 'Failed to send OTP');
        }
      } catch (error) {
        console.error('Send OTP error:', error);
        toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    setOtpLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email: tempEmail,
        otp: otp
      });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
        toast.success('Email verified! Registration complete. Welcome to WedCard Pro!');
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast.error(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/resend-otp`, {
        email: tempEmail
      });
      
      if (response.data.success) {
        toast.success('New OTP sent to your email!');
      } else {
        toast.error(response.data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fillDemoCredentials = () => {
    setFormData({
      ...formData,
      email: 'demo@example.com',
      password: 'demo123'
    });
    toast.success('Demo credentials filled! Click Sign In.');
  };

  const copyDemoCredentials = () => {
    const credentials = `Email: demo@example.com\nPassword: demo123`;
    navigator.clipboard.writeText(credentials);
    setCopied(true);
    toast.success('Credentials copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const backToForm = () => {
    setStep('form');
    setOtp('');
  };

  if (step === 'otp') {
    return (
      <div className="login-page-premium">
        <div className="login-bg">
          <div className="login-orb orb-1"></div>
          <div className="login-orb orb-2"></div>
          <div className="login-orb orb-3"></div>
          <div className="login-orb orb-4"></div>
          <div className="login-grid"></div>
        </div>

        <div className="otp-container">
          <div className="otp-card-premium">
            <div className="otp-header">
              <div className="otp-logo">
                <FaHeart className="otp-heart" />
                <span>Wed<span className="text-gold">Card</span> Pro</span>
              </div>
              <Link to="/" className="home-link-small">
                <FaHome /> Home
              </Link>
            </div>
            
            <div className="otp-content">
              <div className="otp-icon-wrapper">
                <FaKey className="otp-main-icon" />
              </div>
              <h2>Verify Your Email</h2>
              <p>We've sent a 6-digit verification code to</p>
              <strong className="otp-email">{tempEmail}</strong>
              
              <div className="otp-input-group">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                  className="otp-input-premium"
                />
                <div className="otp-input-highlight"></div>
              </div>
              
              <button 
                onClick={handleVerifyOTP}
                className="otp-verify-btn"
                disabled={otpLoading}
              >
                {otpLoading ? <FaSpinner className="spinning" /> : 'Verify & Complete Registration'}
                <FaArrowRight />
              </button>
              
              <div className="otp-resend">
                <p>Didn't receive the code? </p>
                <button onClick={handleResendOTP} disabled={resendLoading}>
                  {resendLoading ? <FaSpinner className="spinning" /> : 'Resend OTP'}
                </button>
              </div>
              
              <button onClick={backToForm} className="otp-back-btn">
                ← Back to Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page-premium">
      <div className="login-bg">
        <div className="login-orb orb-1"></div>
        <div className="login-orb orb-2"></div>
        <div className="login-orb orb-3"></div>
        <div className="login-orb orb-4"></div>
        <div className="login-grid"></div>
      </div>

      <div className="floating-hearts">
        <FaHeart className="floating-heart heart-1" />
        <FaHeart className="floating-heart heart-2" />
        <FaHeart className="floating-heart heart-3" />
        <FaStar className="floating-star star-1" />
        <FaStar className="floating-star star-2" />
      </div>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="bottom-nav-bar">
        <Link to="/" className="bottom-nav-home">
          <FaHome />
          <span>Home</span>
        </Link>
        <div className="bottom-nav-indicator"></div>
      </div>

      <div className="login-container-premium">
        <div className="login-card-premium">
          {/* Desktop Back Button */}
          <Link to="/" className="desktop-back-home">
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
          
          <div className="login-header-premium">
            <div className="login-logo-premium">
              <div className="logo-glow">
                <FaHeart className="logo-heart" />
              </div>
              <span>Wed<span className="text-gold">Card</span> Pro</span>
            </div>
            <h2>{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h2>
            <p>{isLogin ? 'Sign in to access your dashboard' : 'Start creating beautiful wedding invitations'}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form-premium">
            {!isLogin && (
              <div className="form-group-premium">
                <label>Full Name *</label>
                <div className="input-wrapper-premium">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                    placeholder="Enter your full name"
                  />
                  <div className="input-focus-glow"></div>
                </div>
              </div>
            )}

            <div className="form-group-premium">
              <label>Email Address *</label>
              <div className="input-wrapper-premium">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
                <div className="input-focus-glow"></div>
              </div>
            </div>

            <div className="form-group-premium">
              <label>Password *</label>
              <div className="input-wrapper-premium">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder={isLogin ? "Enter your password" : "Create a password (min 6 characters)"}
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="input-focus-glow"></div>
              </div>
            </div>

            {!isLogin && (
              <div className="form-group-premium">
                <label>Phone Number (Optional)</label>
                <div className="input-wrapper-premium">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                  <div className="input-focus-glow"></div>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="login-btn-premium"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner" />
                  {isLogin ? 'Signing In...' : 'Sending OTP...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Continue with Email'}
                  <FaArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="login-footer-premium">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="switch-btn"
            >
              {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
            </button>
            {isLogin && (
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            )}
          </div>

          {isLogin && (
            <div className="demo-card-enhanced">
              <div className="demo-card-header">
                <div className="demo-badge">
                  <FaMagic className="demo-magic-icon" />
                  <span>Try Demo Account</span>
                </div>
                <button onClick={copyDemoCredentials} className="copy-demo-btn" title="Copy credentials">
                  {copied ? <FaCheck /> : <FaCopy />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              
              <div className="demo-credentials">
                <div className="credential-item">
                  <span className="credential-label">Email:</span>
                  <code className="credential-value">demo@example.com</code>
                </div>
                <div className="credential-item">
                  <span className="credential-label">Password:</span>
                  <code className="credential-value">demo123</code>
                </div>
              </div>
              
              <button onClick={fillDemoCredentials} className="demo-fill-btn-enhanced">
                <FaMagic />
                <span>Auto-fill Demo Credentials</span>
                <FaArrowRight className="btn-arrow" />
              </button>
            </div>
          )}

          <div className="login-features-enhanced">
            <div className="feature-item">
              <FaCheckCircle />
              <span>Free 14-day trial</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle />
              <span>No credit card required</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle />
              <span>Cancel anytime</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle />
              <span>24/7 Support</span>
            </div>
          </div>

          <p className="terms-text">
            By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FaHeart, FaEnvelope, FaLock, FaUser, FaPhone, 
  FaArrowRight, FaEye, FaEyeSlash, FaCheckCircle, 
  FaSpinner, FaMagic, FaCopy, FaCheck, FaStar, FaKey,
  FaHome, FaArrowLeft, FaGoogle, FaFacebook, FaGithub,
  FaTimes
} from 'react-icons/fa';
import '../styles/globals.css';
import '../styles/animations.css';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState('form');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [otp, setOtp] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'https://wedcard-backend.onrender.com/api';

  // Handle body scroll when OTP modal opens
  useEffect(() => {
    if (step === 'otp') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [step]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      setLoading(true);
      const success = await login(formData.email, formData.password);
      setLoading(false);
      if (success) {
        navigate('/dashboard');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill all required fields');
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
      
      setLoading(true);
      try {
        const response = await axios.post(`${API_URL}/auth/send-otp`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        });
        
        if (response.data.success) {
          setTempEmail(formData.email);
          setStep('otp');
          toast.success('OTP sent to your email! Please check your inbox.');
        } else {
          toast.error(response.data.message || 'Failed to send OTP');
        }
      } catch (error) {
        console.error('Send OTP error:', error);
        toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    setOtpLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email: tempEmail,
        otp: otp
      });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
        toast.success('Email verified! Registration complete. Welcome to WedCard Pro!');
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast.error(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/resend-otp`, {
        email: tempEmail
      });
      
      if (response.data.success) {
        toast.success('New OTP sent to your email!');
      } else {
        toast.error(response.data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fillDemoCredentials = () => {
    setFormData({
      ...formData,
      email: 'demo@example.com',
      password: 'demo123'
    });
    toast.success('Demo credentials filled! Click Sign In.');
  };

  const copyDemoCredentials = () => {
    const credentials = `Email: demo@example.com\nPassword: demo123`;
    navigator.clipboard.writeText(credentials);
    setCopied(true);
    toast.success('Credentials copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const backToForm = () => {
    setStep('form');
    setOtp('');
  };

  // OTP Verification Screen
  if (step === 'otp') {
    return (
      <div className="login-page-premium">
        <div className="login-bg">
          <div className="login-orb orb-1"></div>
          <div className="login-orb orb-2"></div>
          <div className="login-orb orb-3"></div>
          <div className="login-orb orb-4"></div>
          <div className="login-grid"></div>
        </div>

        <div className="otp-container">
          <div className="otp-card-premium">
            <div className="otp-header">
              <div className="otp-logo">
                <FaHeart className="otp-heart" />
                <span>Wed<span className="text-gold">Card</span> Pro</span>
              </div>
              <button onClick={backToForm} className="otp-close-btn">
                <FaTimes />
              </button>
            </div>
            
            <div className="otp-content">
              <div className="otp-icon-wrapper">
                <FaKey className="otp-main-icon" />
              </div>
              <h2>Verify Your Email</h2>
              <p>We've sent a 6-digit verification code to</p>
              <strong className="otp-email">{tempEmail}</strong>
              
              <div className="otp-input-group">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                  className="otp-input-premium"
                />
                <div className="otp-input-highlight"></div>
              </div>
              
              <button 
                onClick={handleVerifyOTP}
                className="otp-verify-btn"
                disabled={otpLoading}
              >
                {otpLoading ? <FaSpinner className="spinning" /> : 'Verify & Complete Registration'}
                <FaArrowRight />
              </button>
              
              <div className="otp-resend">
                <p>Didn't receive the code? </p>
                <button onClick={handleResendOTP} disabled={resendLoading}>
                  {resendLoading ? <FaSpinner className="spinning" /> : 'Resend OTP'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page-premium">
      {/* Animated Background */}
      <div className="login-bg">
        <div className="login-orb orb-1"></div>
        <div className="login-orb orb-2"></div>
        <div className="login-orb orb-3"></div>
        <div className="login-orb orb-4"></div>
        <div className="login-grid"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-hearts">
        <FaHeart className="floating-heart heart-1" />
        <FaHeart className="floating-heart heart-2" />
        <FaHeart className="floating-heart heart-3" />
        <FaStar className="floating-star star-1" />
        <FaStar className="floating-star star-2" />
      </div>

      {/* Desktop Back Button - Top Left */}
      <Link to="/" className="desktop-back-home">
        <FaArrowLeft />
        <span>Back to Home</span>
      </Link>

      {/* Mobile Bottom Navigation */}
      <div className="bottom-nav-bar">
        <Link to="/" className="bottom-nav-home">
          <FaHome />
          <span>Home</span>
        </Link>
      </div>

      <div className="login-container-premium">
        <div className="login-card-premium">
          <div className="login-header-premium">
            <div className="login-logo-premium">
              <div className="logo-glow">
                <FaHeart className="logo-heart" />
              </div>
              <span>Wed<span className="text-gold">Card</span> Pro</span>
            </div>
            <h2>{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h2>
            <p>{isLogin ? 'Sign in to access your dashboard' : 'Start creating beautiful wedding invitations'}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form-premium">
            {!isLogin && (
              <div className="form-group-premium">
                <label>Full Name *</label>
                <div className="input-wrapper-premium">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                    placeholder="Enter your full name"
                  />
                  <div className="input-focus-glow"></div>
                </div>
              </div>
            )}

            <div className="form-group-premium">
              <label>Email Address *</label>
              <div className="input-wrapper-premium">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
                <div className="input-focus-glow"></div>
              </div>
            </div>

            <div className="form-group-premium">
              <label>Password *</label>
              <div className="input-wrapper-premium">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder={isLogin ? "Enter your password" : "Create a password (min 6 characters)"}
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="input-focus-glow"></div>
              </div>
            </div>

            {!isLogin && (
              <div className="form-group-premium">
                <label>Phone Number (Optional)</label>
                <div className="input-wrapper-premium">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                  <div className="input-focus-glow"></div>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="login-btn-premium"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner" />
                  {isLogin ? 'Signing In...' : 'Sending OTP...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Continue with Email'}
                  <FaArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="login-footer-premium">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="switch-btn"
            >
              {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
            </button>
            {isLogin && (
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            )}
          </div>

          {isLogin && (
            <div className="demo-card-enhanced">
              <div className="demo-card-header">
                <div className="demo-badge">
                  <FaMagic className="demo-magic-icon" />
                  <span>Try Demo Account</span>
                </div>
                <button onClick={copyDemoCredentials} className="copy-demo-btn" title="Copy credentials">
                  {copied ? <FaCheck /> : <FaCopy />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              
              <div className="demo-credentials">
                <div className="credential-item">
                  <span className="credential-label">Email:</span>
                  <code className="credential-value">demo@example.com</code>
                </div>
                <div className="credential-item">
                  <span className="credential-label">Password:</span>
                  <code className="credential-value">demo123</code>
                </div>
              </div>
              
              <button onClick={fillDemoCredentials} className="demo-fill-btn-enhanced">
                <FaMagic />
                <span>Auto-fill Demo Credentials</span>
                <FaArrowRight className="btn-arrow" />
              </button>
            </div>
          )}

          <div className="login-features-enhanced">
            <div className="feature-item">
              <FaCheckCircle />
              <span>Free 14-day trial</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle />
              <span>No credit card required</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle />
              <span>Cancel anytime</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle />
              <span>24/7 Support</span>
            </div>
          </div>

          <p className="terms-text">
            By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;