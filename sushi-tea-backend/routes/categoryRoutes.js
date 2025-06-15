const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');

// Temporary route handler for testing
router.get('/', (req, res) => {
  res.status(200).json({ 
    success: true, 
    data: { 
      categories: [],
      message: 'Categories route is working!' 
    } 
  });
});

module.exports = router;
