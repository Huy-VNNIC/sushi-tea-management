const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleBestSeller,
  toggleAvailability
} = require('../controllers/menuItemController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getMenuItems);
router.get('/:id', getMenuItem);

// Protected routes - Admin only
router.post('/', protect, authorize('admin'), createMenuItem);
router.put('/:id', protect, authorize('admin'), updateMenuItem);
router.delete('/:id', protect, authorize('admin'), deleteMenuItem);
router.put('/:id/bestseller', protect, authorize('admin'), toggleBestSeller);
router.put('/:id/availability', protect, authorize('admin'), toggleAvailability);

module.exports = router;
