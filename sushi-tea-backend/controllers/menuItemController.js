const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');
const ApiResponse = require('../utils/apiResponse');

// @desc    Lấy tất cả menu items
// @route   GET /api/menu-items
// @access  Public
exports.getMenuItems = async (req, res, next) => {
  try {
    const filter = {};
    
    // Filter by category
    if (req.query.category) {
      const category = await Category.findOne({ slug: req.query.category });
      if (category) {
        filter.categoryId = category._id;
      }
    }
    
    // Filter by availability
    if (req.query.isAvailable) {
      filter.isAvailable = req.query.isAvailable === 'true';
    }
    
    // Search by name
    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;
    
    // Sorting
    const sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1; // Default sorting
    }
    
    const menuItems = await MenuItem.find(filter)
      .populate('categoryId', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    const total = await MenuItem.countDocuments(filter);
    
    ApiResponse.success(res, { 
      menuItems, 
      pagination: {
        current: page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, 'Lấy danh sách món thành công');
  } catch (error) {
    console.error('Error in getMenuItems:', error);
    next(error);
  }
};

// @desc    Lấy chi tiết menu item
// @route   GET /api/menu-items/:id
// @access  Public
exports.getMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id)
      .populate('categoryId', 'name slug');
    
    if (!menuItem) {
      return ApiResponse.error(res, 'Không tìm thấy món', 404);
    }
    
    ApiResponse.success(res, { menuItem }, 'Lấy chi tiết món thành công');
  } catch (error) {
    console.error('Error in getMenuItem:', error);
    next(error);
  }
};

// @desc    Tạo menu item mới
// @route   POST /api/menu-items
// @access  Private/Admin
exports.createMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, discountPrice, categoryId, isAvailable, isBestSeller, image } = req.body;
    
    // Validate input
    if (!name || !price || !categoryId) {
      return ApiResponse.error(res, 'Vui lòng nhập tên, giá và danh mục', 400);
    }
    
    // Kiểm tra category có tồn tại
    const category = await Category.findById(categoryId);
    if (!category) {
      return ApiResponse.error(res, 'Danh mục không tồn tại', 400);
    }
    
    // Tạo menu item
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      discountPrice: discountPrice || 0,
      categoryId,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      isBestSeller: isBestSeller || false,
      image
    });
    
    ApiResponse.success(res, { menuItem }, 'Tạo món mới thành công', 201);
  } catch (error) {
    console.error('Error in createMenuItem:', error);
    next(error);
  }
};

// @desc    Cập nhật menu item
// @route   PUT /api/menu-items/:id
// @access  Private/Admin
exports.updateMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, discountPrice, categoryId, isAvailable, isBestSeller, image } = req.body;
    
    // Tìm menu item
    let menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return ApiResponse.error(res, 'Không tìm thấy món', 404);
    }
    
    // Nếu cập nhật categoryId, kiểm tra category có tồn tại
    if (categoryId && categoryId !== menuItem.categoryId.toString()) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return ApiResponse.error(res, 'Danh mục không tồn tại', 400);
      }
    }
    
    // Cập nhật menu item
    menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        name: name || menuItem.name,
        description: description !== undefined ? description : menuItem.description,
        price: price || menuItem.price,
        discountPrice: discountPrice !== undefined ? discountPrice : menuItem.discountPrice,
        categoryId: categoryId || menuItem.categoryId,
        isAvailable: isAvailable !== undefined ? isAvailable : menuItem.isAvailable,
        isBestSeller: isBestSeller !== undefined ? isBestSeller : menuItem.isBestSeller,
        image: image || menuItem.image
      },
      { new: true, runValidators: true }
    ).populate('categoryId', 'name slug');
    
    ApiResponse.success(res, { menuItem }, 'Cập nhật món thành công');
  } catch (error) {
    console.error('Error in updateMenuItem:', error);
    next(error);
  }
};

// @desc    Xóa menu item
// @route   DELETE /api/menu-items/:id
// @access  Private/Admin
exports.deleteMenuItem = async (req, res, next) => {
  try {
    // Tìm và xóa menu item
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return ApiResponse.error(res, 'Không tìm thấy món', 404);
    }
    
    await menuItem.remove();
    
    ApiResponse.success(res, {}, 'Xóa món thành công');
  } catch (error) {
    console.error('Error in deleteMenuItem:', error);
    next(error);
  }
};

// @desc    Đặt món làm best seller
// @route   PUT /api/menu-items/:id/bestseller
// @access  Private/Admin
exports.toggleBestSeller = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return ApiResponse.error(res, 'Không tìm thấy món', 404);
    }
    
    menuItem.isBestSeller = !menuItem.isBestSeller;
    await menuItem.save();
    
    ApiResponse.success(
      res, 
      { menuItem }, 
      `Món ${menuItem.isBestSeller ? 'đã được' : 'đã bị hủy'} đặt làm best seller`
    );
  } catch (error) {
    console.error('Error in toggleBestSeller:', error);
    next(error);
  }
};

// @desc    Đặt trạng thái món
// @route   PUT /api/menu-items/:id/availability
// @access  Private/Admin
exports.toggleAvailability = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return ApiResponse.error(res, 'Không tìm thấy món', 404);
    }
    
    menuItem.isAvailable = !menuItem.isAvailable;
    await menuItem.save();
    
    ApiResponse.success(
      res, 
      { menuItem }, 
      `Món đã ${menuItem.isAvailable ? 'được bật' : 'bị tắt'} trạng thái có sẵn`
    );
  } catch (error) {
    console.error('Error in toggleAvailability:', error);
    next(error);
  }
};
