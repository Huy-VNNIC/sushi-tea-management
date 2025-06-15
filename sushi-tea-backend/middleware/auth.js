const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

// Bảo vệ các route yêu cầu đăng nhập
exports.protect = async (req, res, next) => {
  let token;

  // Kiểm tra token từ Authorization header hoặc cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Lấy token từ header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    // Lấy token từ cookie
    token = req.cookies.token;
  }

  // Kiểm tra xem token có tồn tại không
  if (!token) {
    return ApiResponse.error(
      res,
      'Không có quyền truy cập, vui lòng đăng nhập',
      401
    );
  }

  try {
    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Tìm user theo id từ token
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return ApiResponse.error(
        res,
        'Người dùng không tồn tại',
        401
      );
    }

    next();
  } catch (err) {
    return ApiResponse.error(
      res,
      'Không có quyền truy cập, vui lòng đăng nhập',
      401
    );
  }
};

// Giới hạn quyền truy cập theo role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        `Vai trò ${req.user.role} không có quyền truy cập vào route này`,
        403
      );
    }
    next();
  };
};
