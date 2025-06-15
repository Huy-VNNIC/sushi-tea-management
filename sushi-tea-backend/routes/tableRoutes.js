const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
  getTables,
  getTable,
  createTable,
  updateTable,
  deleteTable,
  updateTableStatus,
  regenerateQRCode
} = require('../controllers/tableController');

// Protected routes
router.route('/')
  .get(protect, getTables)
  .post(protect, authorize('admin'), createTable);

router.route('/:id')
  .get(protect, getTable)
  .put(protect, authorize('admin'), updateTable)
  .delete(protect, authorize('admin'), deleteTable);

router.put('/:id/status', protect, updateTableStatus);
router.put('/:id/qrcode', protect, authorize('admin'), regenerateQRCode);

module.exports = router;
