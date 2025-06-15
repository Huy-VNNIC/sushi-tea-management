const express = require('express');
const router = express.Router();
const {
  getToppings,
  createTopping,
  updateTopping,
  deleteTopping
} = require('../controllers/toppingController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getToppings);

// Admin routes
router.post('/', protect, authorize('admin'), createTopping);
router.put('/:id', protect, authorize('admin'), updateTopping);
router.delete('/:id', protect, authorize('admin'), deleteTopping);

module.exports = router;
