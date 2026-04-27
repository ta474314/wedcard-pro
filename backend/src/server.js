const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const emailService = require('./services/emailService');

const app = express();

// Create logs directory
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log file paths
const AUTH_LOG_FILE = path.join(logsDir, 'authenticate.log');
const ERROR_LOG_FILE = path.join(logsDir, 'error.log');
const CHANGE_LOG_FILE = path.join(logsDir, 'changes.log');

// Helper functions
const getTimestamp = () => new Date().toISOString();
const getFormattedDate = () => new Date().toISOString().split('T')[0];

const writeDetailedLog = (logFile, logData, req = null) => {
  const timestamp = getTimestamp();
  const date = getFormattedDate();
  const ip = req?.ip || req?.connection?.remoteAddress || 'Unknown';
  const userAgent = req?.headers['user-agent'] || 'Unknown';
  
  const logEntry = {
    timestamp, date, type: logData.type || 'LOG', ip, userAgent, data: logData
  };
  
  const logLine = JSON.stringify(logEntry, null, 2);
  const separator = '='.repeat(80);
  fs.appendFileSync(logFile, `${logLine}\n${separator}\n`, 'utf8');
};

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  otp: { type: String, default: null },
  otpExpires: { type: Date, default: null },
  resetOTP: { type: String, default: null },
  resetOTPExpires: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Generate OTP (6-digit)
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wedcard_db')
  .then(() => {
    console.log('\n✅ MongoDB Connected Successfully!');
    console.log(`📀 Database: ${mongoose.connection.name}`);
    console.log(`🔗 Host: ${mongoose.connection.host}\n`);
    createDemoUser();
  })
  .catch(err => {
    console.error('\n❌ MongoDB Connection Error:', err.message);
    console.log('\n💡 Solutions:');
    console.log('1. Install MongoDB from: https://www.mongodb.com/try/download/community');
    console.log('2. Start MongoDB: "C:\\Program Files\\MongoDB\\Server\\7.0\\bin\\mongod.exe" --dbpath C:\\data\\db');
    console.log('3. Or use MongoDB Atlas cloud database\n');
  });

const createDemoUser = async () => {
  try {
    const existingDemo = await User.findOne({ email: 'demo@example.com' });
    if (!existingDemo) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('demo123', salt);
      
      const demoUser = new User({
        name: 'Demo User',
        email: 'demo@example.com',
        password: hashedPassword,
        phone: '9999999999',
        isVerified: true
      });
      
      await demoUser.save();
      console.log('✅ Demo user created: demo@example.com / demo123');
    } else {
      console.log('✅ Demo user already exists');
    }
  } catch (error) {
    console.error('Error creating demo user:', error.message);
  }
};

// ==================== API ROUTES ====================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    usersCount: 0,
    timestamp: new Date().toISOString()
  });
});

// REGISTER - Step 1: Send OTP
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    console.log('📝 Send OTP request:', { name, email });
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }
    
    // Check if user exists and is verified
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    console.log(`📧 Generated OTP for ${email}: ${otp}`);
    
    if (existingUser && !existingUser.isVerified) {
      // Update existing unverified user
      existingUser.name = name;
      existingUser.password = await bcrypt.hash(password, 10);
      existingUser.phone = phone || '';
      existingUser.otp = otp;
      existingUser.otpExpires = otpExpires;
      await existingUser.save();
    } else {
      // Create new user with OTP
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name, email, password: hashedPassword, phone: phone || '',
        otp, otpExpires, isVerified: false
      });
      await newUser.save();
    }
    
    // Send OTP email
    const emailSent = await emailService.sendOTPEmail(email, name, otp);
    
    if (!emailSent) {
      console.log('⚠️ Email sending failed but user was created');
    }
    
    writeDetailedLog(AUTH_LOG_FILE, {
      action: 'OTP_SENT', status: 'SUCCESS', user: { email }
    }, req);
    
    res.json({
      success: true,
      message: 'OTP sent to your email. Please verify to complete registration.',
      email: email
    });
    
  } catch (error) {
    console.error('Send OTP error:', error);
    writeDetailedLog(ERROR_LOG_FILE, { action: 'SEND_OTP_ERROR', error: error.message });
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});

// REGISTER - Step 2: Verify OTP and Complete Registration
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    console.log('🔐 Verify OTP request:', { email, otp });
    
    const user = await User.findOne({ 
      email, 
      otp: otp,
      otpExpires: { $gt: new Date() } 
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP. Please request a new OTP.'
      });
    }
    
    // Mark user as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'my_secret_key_123456789',
      { expiresIn: '7d' }
    );
    
    writeDetailedLog(AUTH_LOG_FILE, {
      action: 'REGISTER_SUCCESS', status: 'SUCCESS', user: { id: user._id, email: user.email }
    }, req);
    
    console.log(`✅ User verified and registered: ${email}`);
    
    res.json({
      success: true,
      message: 'Email verified successfully! Registration complete.',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token
      }
    });
    
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});

// Resend OTP
app.post('/api/auth/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email, isVerified: false });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found or already verified'
      });
    }
    
    const newOTP = generateOTP();
    user.otp = newOTP;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    
    console.log(`📧 Resent OTP for ${email}: ${newOTP}`);
    
    await emailService.sendOTPEmail(email, user.name, newOTP);
    
    res.json({
      success: true,
      message: 'New OTP sent to your email'
    });
    
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 Login request:', { email });
    
    writeDetailedLog(AUTH_LOG_FILE, {
      action: 'LOGIN_ATTEMPT', status: 'PENDING', user: { email }
    }, req);
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email first. Check your inbox for OTP.',
        needVerification: true,
        email: user.email
      });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'my_secret_key_123456789',
      { expiresIn: '7d' }
    );
    
    writeDetailedLog(AUTH_LOG_FILE, {
      action: 'LOGIN_SUCCESS', status: 'SUCCESS', user: { id: user._id, email: user.email }
    }, req);
    
    console.log(`✅ User logged in: ${email}`);
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// FORGOT PASSWORD - Send OTP
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log('📧 Forgot password request for:', email);
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email address'
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      // For security, don't reveal if user exists
      return res.json({
        success: true,
        message: 'If your email is registered, you will receive an OTP.'
      });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    user.resetOTP = otp;
    user.resetOTPExpires = otpExpires;
    await user.save();
    
    console.log(`📧 Password reset OTP for ${email}: ${otp}`);
    
    // Send OTP email
    await emailService.sendPasswordResetOTP(email, user.name, otp);
    
    writeDetailedLog(AUTH_LOG_FILE, {
      action: 'FORGOT_PASSWORD_OTP_SENT',
      status: 'SUCCESS',
      user: { email }
    }, req);
    
    console.log(`✅ Password reset OTP sent to: ${email}`);
    
    res.json({
      success: true,
      message: 'Password reset OTP sent to your email.'
    });
    
  } catch (error) {
    console.error('Forgot password error:', error);
    writeDetailedLog(ERROR_LOG_FILE, {
      action: 'FORGOT_PASSWORD_ERROR',
      error: error.message
    });
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});

// VERIFY RESET OTP
app.post('/api/auth/verify-reset-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    console.log('🔐 Verify reset OTP for:', email);
    
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }
    
    const user = await User.findOne({
      email,
      resetOTP: otp,
      resetOTPExpires: { $gt: new Date() }
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP. Please request a new one.'
      });
    }
    
    console.log(`✅ Reset OTP verified for: ${email}`);
    
    res.json({
      success: true,
      message: 'OTP verified. You can now reset your password.'
    });
    
  } catch (error) {
    console.error('Verify reset OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});

// RESET PASSWORD
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    console.log('🔐 Reset password for:', email);
    
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP and new password are required'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }
    
    const user = await User.findOne({
      email,
      resetOTP: otp,
      resetOTPExpires: { $gt: new Date() }
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP. Please request a new one.'
      });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    user.password = hashedPassword;
    user.resetOTP = null;
    user.resetOTPExpires = null;
    await user.save();
    
    writeDetailedLog(AUTH_LOG_FILE, {
      action: 'PASSWORD_RESET_SUCCESS',
      status: 'SUCCESS',
      user: { email }
    }, req);
    
    console.log(`✅ Password reset successful for: ${email}`);
    
    res.json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.'
    });
    
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});

// RESEND RESET OTP
app.post('/api/auth/resend-reset-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: true,
        message: 'If your email is registered, you will receive an OTP.'
      });
    }
    
    const otp = generateOTP();
    user.resetOTP = otp;
    user.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    
    console.log(`📧 Resent reset OTP for ${email}: ${otp}`);
    
    await emailService.sendPasswordResetOTP(email, user.name, otp);
    
    res.json({
      success: true,
      message: 'New OTP sent to your email.'
    });
    
  } catch (error) {
    console.error('Resend reset OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET CURRENT USER
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my_secret_key_123456789');
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, data: user });
    
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

// LOGOUT
app.post('/api/auth/logout', (req, res) => {
  writeDetailedLog(AUTH_LOG_FILE, { action: 'LOGOUT', status: 'SUCCESS' }, req);
  res.json({ success: true, message: 'Logged out successfully' });
});

// GET ALL USERS (For testing)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE USER (For testing)
app.delete('/api/users/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const result = await User.deleteOne({ email });
    
    if (result.deletedCount > 0) {
      res.json({ success: true, message: `User ${email} deleted successfully` });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Import AI service
const aiService = require('./services/aiService');

// ==================== AI INVITATION GENERATION ====================

// Generate AI Invitation
app.post('/api/ai/generate-invitation', async (req, res) => {
  try {
    const { brideName, groomName, eventDate, eventTime, venue, theme, details, guests } = req.body;
    
    console.log('🎨 AI Invitation Generation Request:', { brideName, groomName, theme });
    
    if (!brideName || !groomName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide bride and groom names'
      });
    }
    
    const userInput = {
      brideName,
      groomName,
      eventDate: eventDate || 'To be announced',
      eventTime: eventTime || 'To be announced',
      venue: venue || 'To be announced',
      theme: theme || 'Romantic',
      details: details || 'Wedding Celebration',
      guests: guests || 100
    };
    
    const invitation = await aiService.generateInvitation(userInput);
    const rsvpQuestions = await aiService.generateRSVPQuestions(userInput);
    const venueSuggestions = await aiService.generateVenueSuggestions(venue || 'your city', 'moderate');
    
    writeDetailedLog(AUTH_LOG_FILE, {
      action: 'AI_INVITATION_GENERATED',
      status: 'SUCCESS',
      user: { brideName, groomName }
    }, req);
    
    res.json({
      success: true,
      message: 'Invitation generated successfully',
      data: {
        invitation,
        rsvpQuestions,
        venueSuggestions,
        suggestedDate: eventDate || new Date().toISOString().split('T')[0],
        suggestedTime: eventTime || '18:00'
      }
    });
    
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate invitation. Please try again.'
    });
  }
});

// Enhance Invitation Text
app.post('/api/ai/enhance-text', async (req, res) => {
  try {
    const { text, type } = req.body;
    
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Enhance this ${type} for a wedding invitation to make it more romantic and professional: "${text}". Make it more elegant and heartfelt. Keep it concise.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text();
    
    res.json({
      success: true,
      enhancedText: enhancedText || text
    });
    
  } catch (error) {
    res.json({
      success: true,
      enhancedText: text
    });
  }
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('🚀 SERVER STARTED SUCCESSFULLY');
  console.log('========================================');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📝 Health: http://localhost:${PORT}/api/health`);
  console.log(`📧 Register: POST /api/auth/send-otp + /api/auth/verify-otp`);
  console.log(`🔐 Login: POST /api/auth/login`);
  console.log(`🔑 Forgot Password: POST /api/auth/forgot-password`);
  console.log(`👥 Users: GET http://localhost:${PORT}/api/users`);
  console.log('========================================\n');
});