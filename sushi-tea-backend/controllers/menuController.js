const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get full menu with categories
 * @route   GET /api/menu
 * @access  Public
 */
exports.getFullMenu = async (req, res, next) => {
  try {
    // Lấy danh sách categories
    const categories = await Category.find({ isActive: true }).sort({ order: 1 });
    
    // Lấy menu items và nhóm theo category
    const menuItems = await MenuItem.find({ isAvailable: true }).sort({ price: 1 });
    
    // Tạo menu với items được nhóm theo category
    const menu = categories.map(category => {
      const items = menuItems.filter(item => 
        item.categoryId && item.categoryId.toString() === category._id.toString()
      );
      
      return {
        category: {
          _id: category._id,
          name: category.name,
          slug: category.slug,
          description: category.description
        },
        items
      };
    });
    
    ApiResponse.success(res, { menu }, 'Menu retrieved successfully');
  } catch (error) {
    console.error('Error in getFullMenu:', error);
    next(error);
  }
};

/**
 * @desc    Get menu by category
 * @route   GET /api/menu/category/:slug
 * @access  Public
 */
exports.getMenuByCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    // Tìm category theo slug
    const category = await Category.findOne({ slug, isActive: true });
    
    if (!category) {
      return ApiResponse.error(res, 'Category not found', 404);
    }
    
    // Lấy items thuộc category
    const items = await MenuItem.find({ 
      categoryId: category._id,
      isAvailable: true 
    }).sort({ price: 1 });
    
    ApiResponse.success(res, {
      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        description: category.description
      },
      items
    }, 'Category menu retrieved successfully');
  } catch (error) {
    console.error('Error in getMenuByCategory:', error);
    next(error);
  }
};

/**
 * @desc    Get best seller items
 * @route   GET /api/menu/best-sellers
 * @access  Public
 */
exports.getBestSellers = async (req, res, next) => {
  try {
    // Tìm các sản phẩm best sellers và có sẵn
    const bestSellers = await MenuItem.find({ 
      isBestSeller: true,
      isAvailable: true
    }).populate('categoryId', 'name slug');
    
    // Format lại response để phù hợp với frontend
    const formattedBestSellers = bestSellers.map(item => {
      return {
        _id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        discountPrice: item.discountPrice || 0,
        image: item.image || null,
        categoryId: {
          _id: item.categoryId?._id || '',
          name: item.categoryId?.name || 'Unknown Category',
          slug: item.categoryId?.slug || ''
        },
        isAvailable: item.isAvailable,
        isBestSeller: item.isBestSeller
      };
    });
    
    ApiResponse.success(res, { 
      bestSellers: formattedBestSellers 
    }, 'Best sellers retrieved successfully');
  } catch (error) {
    console.error('Error in getBestSellers:', error);
    next(error);
  }
};
