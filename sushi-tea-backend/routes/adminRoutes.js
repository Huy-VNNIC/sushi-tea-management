const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Import controllers
const {
  getDashboardStats,
  // Các controller khác nếu có
} = require('../controllers/adminController');

// Sử dụng middleware để bảo vệ tất cả routes
router.use(protect);
router.use(authorize('admin'));

// Dashboard routes
router.get('/dashboard', getDashboardStats);

// Không sử dụng settings route ở đây nữa, chuyển sang settingsRoutes.js

module.exports = router;
