const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service error:', error);
  } else {
    console.log('✅ Email service ready');
  }
});

// Send OTP Email
const sendOTPEmail = async (email, name, otp) => {
  const mailOptions = {
    from: `"WedCard Pro" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔐 Verify Your Email - WedCard Pro OTP',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Email Verification OTP</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 550px;
            margin: 30px auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 5px 25px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #FF3366, #FF6B35);
            padding: 35px;
            text-align: center;
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
          }
          .content {
            padding: 35px;
            text-align: center;
          }
          .otp-box {
            background: linear-gradient(135deg, #FFF5F7, #FFE4E9);
            padding: 25px;
            border-radius: 12px;
            margin: 25px 0;
            text-align: center;
          }
          .otp-code {
            font-size: 42px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #FF3366;
            font-family: monospace;
            background: white;
            padding: 15px;
            border-radius: 10px;
            display: inline-block;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #FF3366, #FF6B35);
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 25px;
            margin: 20px 0;
            font-weight: bold;
            border: none;
            cursor: pointer;
          }
          .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .expiry {
            color: #ff9800;
            font-size: 12px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>❤️ WedCard Pro</h1>
          </div>
          <div class="content">
            <h2>Welcome ${name}!</h2>
            <p>Thank you for registering with WedCard Pro.</p>
            <p>Please use the OTP below to verify your email address:</p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <p>This OTP will expire in <strong>10 minutes</strong>.</p>
            <p class="expiry">If you didn't request this, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2026 WedCard Pro. All rights reserved.</p>
            <p>Making weddings memorable, one invitation at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending OTP:', error);
    return false;
  }
};

// Send Password Reset OTP Email
const sendPasswordResetOTP = async (email, name, otp) => {
  const mailOptions = {
    from: `"WedCard Pro" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔐 Password Reset OTP - WedCard Pro',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Password Reset OTP</title>
        <style>
          body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 550px; margin: 30px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #FF3366, #FF6B35); padding: 35px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { padding: 35px; text-align: center; }
          .otp-box { background: linear-gradient(135deg, #FFF5F7, #FFE4E9); padding: 25px; border-radius: 12px; margin: 25px 0; }
          .otp-code { font-size: 42px; font-weight: bold; letter-spacing: 8px; color: #FF3366; font-family: monospace; background: white; padding: 15px; border-radius: 10px; display: inline-block; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>❤️ WedCard Pro</h1>
          </div>
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hello ${name},</p>
            <p>We received a request to reset your password.</p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <p>This OTP will expire in <strong>10 minutes</strong>.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2026 WedCard Pro. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset OTP sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending password reset OTP:', error);
    return false;
  }
};

module.exports = {
  sendOTPEmail,
  sendPasswordResetOTP,
};