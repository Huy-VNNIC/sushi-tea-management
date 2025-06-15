const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/', createOrder);

// Protected routes - Admin/Staff only
router.get('/', protect, authorize('admin', 'staff'), getOrders);
router.get('/:id', protect, authorize('admin', 'staff'), getOrder);
router.put('/:id/status', protect, authorize('admin', 'staff'), updateOrderStatus);
router.put('/:id/cancel', protect, authorize('admin', 'staff'), cancelOrder);

module.exports = router;
