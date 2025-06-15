const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

/**
 * Middleware bảo vệ routes yêu cầu đăng nhập
 */
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Kiểm tra token trong header Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Nếu không có token
    if (!token) {
      return ApiResponse.error(
        res,
        'Not authorized to access this route',
        401
      );
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm user từ id đã decode
      const user = await User.findById(decoded.id);

      if (!user) {
        return ApiResponse.error(
          res,
          'User not found',
          401
        );
      }

      // Lưu thông tin user vào request
      req.user = user;
      next();
    } catch (error) {
      return ApiResponse.error(
        res,
        'Not authorized to access this route',
        401
      );
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware kiểm tra roles
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        `User role ${req.user.role} is not authorized to access this route`,
        403
      );
    }
    next();
  };
};
