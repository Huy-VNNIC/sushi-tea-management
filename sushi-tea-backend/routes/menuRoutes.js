const express = require('express');
const router = express.Router();
const {
  getFullMenu,
  getMenuByCategory,
  getBestSellers
} = require('../controllers/menuController');

// Public routes
router.get('/', getFullMenu);
router.get('/best-sellers', getBestSellers);
router.get('/category/:slug', getMenuByCategory);

module.exports = router;
