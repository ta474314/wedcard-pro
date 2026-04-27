import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FaHeart, FaEnvelope, FaArrowRight, FaSpinner, 
  FaKey, FaCheckCircle, FaEye, FaEyeSlash
} from 'react-icons/fa';
import '../styles/globals.css';
import '../styles/animations.css';
import '../styles/LoginPage.css';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState('email'); // email, otp, reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = 'http://localhost:5000/api';

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Sending forgot password request for:', email);
      
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      console.log('Response:', response.data);
      
      if (response.data.success) {
        setStep('otp');
        toast.success('OTP sent to your email! Please check your inbox.');
      } else {
        toast.error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Verifying OTP for:', email);
      
      const response = await axios.post(`${API_URL}/auth/verify-reset-otp`, { email, otp });
      console.log('Response:', response.data);
      
      if (response.data.success) {
        setStep('reset');
        toast.success('OTP verified! Please set your new password.');
      } else {
        toast.error(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      toast.error('Please enter a new password');
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Resetting password for:', email);
      
      const response = await axios.post(`${API_URL}/auth/reset-password`, { 
        email, otp, newPassword 
      });
      console.log('Response:', response.data);
      
      if (response.data.success) {
        toast.success('Password reset successful! Please login with your new password.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/resend-reset-otp`, { email });
      if (response.data.success) {
        toast.success('New OTP sent to your email!');
      } else {
        toast.error(response.data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="login-page-premium">
      {/* Animated Background */}
      <div className="login-bg">
        <div className="login-orb orb-1"></div>
        <div className="login-orb orb-2"></div>
        <div className="login-orb orb-3"></div>
        <div className="login-grid"></div>
      </div>

      {/* Back Button */}
      <Link to="/login" className="back-home">
        <FaArrowRight />
        Back to Login
      </Link>

      <div className="login-container-premium">
        <div className="login-card-premium">
          <div className="login-header-premium">
            <div className="login-logo-premium">
              <div className="logo-glow">
                <FaHeart className="logo-heart" />
              </div>
              <span>Wed<span className="text-gold">Card</span> Pro</span>
            </div>
            
            <h2>
              {step === 'email' && 'Forgot Password?'}
              {step === 'otp' && 'Enter Verification Code'}
              {step === 'reset' && 'Create New Password'}
            </h2>
            
            <p>
              {step === 'email' && 'Enter your email address to receive a password reset OTP'}
              {step === 'otp' && `We've sent a 6-digit verification code to ${email}`}
              {step === 'reset' && 'Enter your new password below'}
            </p>
          </div>

          {/* Step 1: Email Form */}
          {step === 'email' && (
            <form onSubmit={handleSendOTP} className="login-form-premium">
              <div className="form-group-premium">
                <label>Email Address</label>
                <div className="input-wrapper-premium">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your registered email"
                    autoFocus
                  />
                  <div className="input-focus-glow"></div>
                </div>
              </div>

              <button 
                type="submit" 
                className="login-btn-premium" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="spinner" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send Reset OTP
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <div className="otp-form">
              <div className="form-group-premium">
                <label>Enter OTP Code</label>
                <div className="input-wrapper-premium">
                  <FaKey className="input-icon" />
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    autoFocus
                    className="otp-input"
                  />
                  <div className="input-focus-glow"></div>
                </div>
              </div>

              <button 
                onClick={handleVerifyOTP} 
                className="login-btn-premium" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="spinner" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify OTP
                    <FaArrowRight />
                  </>
                )}
              </button>

              <div className="resend-otp-container">
                <p>Didn't receive the code? </p>
                <button 
                  onClick={handleResendOTP} 
                  disabled={resendLoading}
                  className="resend-btn"
                >
                  {resendLoading ? <FaSpinner className="spinner-small" /> : 'Resend OTP'}
                </button>
              </div>

              <button onClick={() => setStep('email')} className="back-to-form-btn">
                ← Use different email
              </button>
            </div>
          )}

          {/* Step 3: Reset Password */}
          {step === 'reset' && (
            <div className="reset-form">
              <div className="form-group-premium">
                <label>New Password</label>
                <div className="input-wrapper-premium">
                  <FaKey className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Enter new password (min 6 characters)"
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

              <div className="form-group-premium">
                <label>Confirm Password</label>
                <div className="input-wrapper-premium">
                  <FaKey className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm your new password"
                  />
                  <div className="input-focus-glow"></div>
                </div>
              </div>

              <button 
                onClick={handleResetPassword} 
                className="login-btn-premium" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="spinner" />
                    Resetting Password...
                  </>
                ) : (
                  <>
                    Reset Password
                    <FaCheckCircle />
                  </>
                )}
              </button>
            </div>
          )}

          <div className="login-footer-premium">
            <Link to="/login" className="switch-btn">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;