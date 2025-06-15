const Category = require('../models/Category');
const MenuItem = require('../models/MenuItem');
const ApiResponse = require('../utils/apiResponse');
const slugify = require('slugify');

// @desc    Lấy tất cả danh mục
// @route   GET /api/admin/categories
// @access  Private/Admin
exports.getCategories = async (req, res, next) => {
  try {
    // Filter
    const filter = {};
    
    // Status filter
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === 'true';
    }
    
    // Search by name
    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };
    }
    
    // Sorting
    const sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      sort.order = 1; // Default sort by order
    }
    
    // Thực hiện truy vấn
    const categories = await Category.find(filter).sort(sort);
    
    ApiResponse.success(res, { categories }, 'Lấy danh sách danh mục thành công');
  } catch (error) {
    console.error('Error in getCategories:', error);
    next(error);
  }
};

// @desc    Lấy chi tiết danh mục
// @route   GET /api/admin/categories/:id
// @access  Private/Admin
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return ApiResponse.error(res, 'Không tìm thấy danh mục', 404);
    }
    
    // Đếm số sản phẩm trong danh mục
    const productCount = await MenuItem.countDocuments({ categoryId: category._id });
    
    ApiResponse.success(res, { 
      category,
      productCount
    }, 'Lấy chi tiết danh mục thành công');
  } catch (error) {
    console.error('Error in getCategory:', error);
    next(error);
  }
};

// @desc    Tạo danh mục mới
// @route   POST /api/admin/categories
// @access  Private/Admin
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, image, order, isActive } = req.body;
    
    if (!name) {
      return ApiResponse.error(res, 'Tên danh mục là bắt buộc', 400);
    }
    
    // Tạo slug từ tên
    const slug = slugify(name, { lower: true });
    
    // Kiểm tra slug đã tồn tại
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return ApiResponse.error(res, 'Tên danh mục đã tồn tại', 400);
    }
    
    // Tạo danh mục
    const category = await Category.create({
      name,
      slug,
      description,
      image,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true
    });
    
    ApiResponse.success(res, { category }, 'Tạo danh mục thành công', 201);
  } catch (error) {
    console.error('Error in createCategory:', error);
    next(error);
  }
};

// @desc    Cập nhật danh mục
// @route   PUT /api/admin/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res, next) => {
  try {
    const { name, description, image, order, isActive } = req.body;
    
    // Tìm danh mục
    let category = await Category.findById(req.params.id);
    
    if (!category) {
      return ApiResponse.error(res, 'Không tìm thấy danh mục', 404);
    }
    
    // Nếu tên thay đổi, tạo slug mới
    let slug = category.slug;
    if (name && name !== category.name) {
      slug = slugify(name, { lower: true });
      
      // Kiểm tra slug mới có trùng với danh mục khác không
      const existingCategory = await Category.findOne({ 
        slug, 
        _id: { $ne: category._id } 
      });
      
      if (existingCategory) {
        return ApiResponse.error(res, 'Tên danh mục đã tồn tại', 400);
      }
    }
    
    // Cập nhật danh mục
    category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: name || category.name,
        slug,
        description: description !== undefined ? description : category.description,
        image: image || category.image,
        order: order !== undefined ? order : category.order,
        isActive: isActive !== undefined ? isActive : category.isActive
      },
      { new: true, runValidators: true }
    );
    
    ApiResponse.success(res, { category }, 'Cập nhật danh mục thành công');
  } catch (error) {
    console.error('Error in updateCategory:', error);
    next(error);
  }
};

// @desc    Xóa danh mục
// @route   DELETE /api/admin/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return ApiResponse.error(res, 'Không tìm thấy danh mục', 404);
    }
    
    // Kiểm tra có sản phẩm trong danh mục không
    const productCount = await MenuItem.countDocuments({ categoryId: category._id });
    
    if (productCount > 0) {
      return ApiResponse.error(res, 'Không thể xóa danh mục vì có sản phẩm đang sử dụng', 400);
    }
    
    await Category.deleteOne({ _id: req.params.id });
    
    ApiResponse.success(res, {}, 'Xóa danh mục thành công');
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    next(error);
  }
};

// @desc    Thay đổi thứ tự danh mục
// @route   PUT /api/admin/categories/reorder
// @access  Private/Admin
exports.reorderCategories = async (req, res, next) => {
  try {
    const { categories } = req.body;
    
    if (!categories || !Array.isArray(categories)) {
      return ApiResponse.error(res, 'Dữ liệu không hợp lệ', 400);
    }
    
    const updates = categories.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { order }
      }
    }));
    
    await Category.bulkWrite(updates);
    
    const updatedCategories = await Category.find().sort({ order: 1 });
    
    ApiResponse.success(res, { categories: updatedCategories }, 'Cập nhật thứ tự danh mục thành công');
  } catch (error) {
    console.error('Error in reorderCategories:', error);
    next(error);
  }
};
