const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

// @desc    Lấy danh sách người dùng
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    // Filter
    const filter = {};
    
    // Role filter
    if (req.query.role) {
      filter.role = req.query.role;
    }
    
    // Search by name or email
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    // Sort
    const sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }
    
    // Thực hiện truy vấn
    const users = await User.find(filter)
      .select('-password')
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments(filter);
    
    ApiResponse.success(res, {
      users,
      pagination: {
        current: page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, 'Lấy danh sách người dùng thành công');
  } catch (error) {
    console.error('Error in getUsers:', error);
    next(error);
  }
};

// @desc    Lấy chi tiết người dùng
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return ApiResponse.error(res, 'Không tìm thấy người dùng', 404);
    }
    
    ApiResponse.success(res, { user }, 'Lấy thông tin người dùng thành công');
  } catch (error) {
    console.error('Error in getUser:', error);
    next(error);
  }
};

// @desc    Tạo người dùng mới
// @route   POST /api/admin/users
// @access  Private/Admin
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;
    
    // Kiểm tra email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiResponse.error(res, 'Email đã được sử dụng', 400);
    }
    
    // Tạo user
    const user = await User.create({
      name,
      email,
      password,
      phone: phone || '',
      role: role || 'user'
    });
    
    ApiResponse.success(res, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    }, 'Tạo người dùng thành công', 201);
  } catch (error) {
    console.error('Error in createUser:', error);
    next(error);
  }
};

// @desc    Cập nhật người dùng
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, phone, role } = req.body;
    
    // Tìm user cần cập nhật
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return ApiResponse.error(res, 'Không tìm thấy người dùng', 404);
    }
    
    // Nếu thay đổi email, kiểm tra email đã tồn tại
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return ApiResponse.error(res, 'Email đã được sử dụng', 400);
      }
    }
    
    // Cập nhật user
    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: name || user.name,
        email: email || user.email,
        phone: phone !== undefined ? phone : user.phone,
        role: role || user.role
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    ApiResponse.success(res, { user }, 'Cập nhật người dùng thành công');
  } catch (error) {
    console.error('Error in updateUser:', error);
    next(error);
  }
};

// @desc    Đặt lại mật khẩu người dùng
// @route   PUT /api/admin/users/:id/reset-password
// @access  Private/Admin
exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    
    if (!newPassword || newPassword.length < 6) {
      return ApiResponse.error(res, 'Mật khẩu phải có ít nhất 6 ký tự', 400);
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return ApiResponse.error(res, 'Không tìm thấy người dùng', 404);
    }
    
    user.password = newPassword;
    await user.save();
    
    ApiResponse.success(res, {}, 'Đặt lại mật khẩu thành công');
  } catch (error) {
    console.error('Error in resetPassword:', error);
    next(error);
  }
};

// @desc    Xóa người dùng
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return ApiResponse.error(res, 'Không tìm thấy người dùng', 404);
    }
    
    // Tự bảo vệ tài khoản admin chính đang đăng nhập
    if (user._id.toString() === req.user.id) {
      return ApiResponse.error(res, 'Không thể xóa tài khoản chính của bạn', 400);
    }
    
    await User.deleteOne({ _id: req.params.id });
    
    ApiResponse.success(res, {}, 'Xóa người dùng thành công');
  } catch (error) {
    console.error('Error in deleteUser:', error);
    next(error);
  }
};
