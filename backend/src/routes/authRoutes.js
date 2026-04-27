const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Logout route
router.post('/logout', protect, async (req, res) => {
  try {
    // In JWT, logout is handled client-side by removing token
    // But you can implement token blacklist here if needed
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during logout'
    });
  }
});

module.exports = router;