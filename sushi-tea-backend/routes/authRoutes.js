const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  login,
  register,
  getProfile,
  updateProfile,
  logout,
  changePassword
} = require('../controllers/authController');

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/logout', protect, logout);
router.post('/change-password', protect, changePassword);

module.exports = router;
