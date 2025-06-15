const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Import controller - mỗi hàm nằm riêng biệt
const { getSettings, updateSetting, getPublicSettings } = require('../controllers/settingsController');

// Public routes - không yêu cầu đăng nhập
router.get('/public', getPublicSettings);

// Admin routes - yêu cầu quyền admin
router.get('/', protect, authorize('admin'), getSettings);
router.put('/:key', protect, authorize('admin'), updateSetting);

module.exports = router;
