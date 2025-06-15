const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

// @desc    Đăng nhập người dùng
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem email và password có được cung cấp không
    if (!email || !password) {
      return ApiResponse.error(res, 'Vui lòng cung cấp email và mật khẩu', 400);
    }

    // Kiểm tra user tồn tại không
    const user = await User.findOne({ email }).select('+password');

    // Nếu không tìm thấy user hoặc password không đúng
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return ApiResponse.error(res, 'Email hoặc mật khẩu không chính xác', 401);
    }

    // Tạo token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    // Thời gian hết hạn của cookie
    const options = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    };

    // Xóa trường password trước khi trả về user
    user.password = undefined;

    res.status(200)
      .cookie('token', token, options)
      .json({
        success: true,
        token,
        data: {
          user
        },
        message: 'Đăng nhập thành công'
      });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

// @desc    Đăng ký người dùng mới
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return ApiResponse.error(res, 'Email đã được sử dụng', 400);
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    // Tạo token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    // Xóa trường password trước khi trả về user
    user.password = undefined;

    ApiResponse.success(res, { user, token }, 'Đăng ký thành công', 201);
  } catch (error) {
    console.error('Register error:', error);
    next(error);
  }
};

// @desc    Lấy thông tin người dùng hiện tại
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    // req.user được set từ middleware auth
    const user = await User.findById(req.user.id);

    if (!user) {
      return ApiResponse.error(res, 'Không tìm thấy người dùng', 404);
    }

    ApiResponse.success(res, { user }, 'Lấy thông tin thành công');
  } catch (error) {
    console.error('Get profile error:', error);
    next(error);
  }
};

// @desc    Cập nhật thông tin người dùng
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    // Các trường được phép cập nhật
    const fieldsToUpdate = {
      name: req.body.name,
      phone: req.body.phone
    };

    // Lọc các trường undefined
    Object.keys(fieldsToUpdate).forEach(key => {
      if (fieldsToUpdate[key] === undefined) {
        delete fieldsToUpdate[key];
      }
    });

    // Cập nhật thông tin
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return ApiResponse.error(res, 'Không tìm thấy người dùng', 404);
    }

    ApiResponse.success(res, { user }, 'Cập nhật thông tin thành công');
  } catch (error) {
    console.error('Update profile error:', error);
    next(error);
  }
};

// @desc    Đăng xuất
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  ApiResponse.success(res, {}, 'Đăng xuất thành công');
};

// @desc    Thay đổi mật khẩu
// @route   POST /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Kiểm tra xem mật khẩu hiện tại và mật khẩu mới có được cung cấp không
    if (!currentPassword || !newPassword) {
      return ApiResponse.error(res, 'Vui lòng cung cấp mật khẩu hiện tại và mật khẩu mới', 400);
    }

    // Lấy user từ database với password
    const user = await User.findById(req.user.id).select('+password');

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return ApiResponse.error(res, 'Mật khẩu hiện tại không chính xác', 401);
    }

    // Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    ApiResponse.success(res, {}, 'Thay đổi mật khẩu thành công');
  } catch (error) {
    console.error('Change password error:', error);
    next(error);
  }
};
