const ApiResponse = require('../utils/apiResponse');
const logger = require('../config/logger');

/**
 * Global Error Handler
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error(`${err.name}: ${err.message}`);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    return ApiResponse.error(
      res,
      'Validation Error',
      400,
      errors
    );
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return ApiResponse.error(
      res,
      'Duplicate field value entered',
      400
    );
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.error(
      res,
      'Invalid token',
      401
    );
  }

  if (err.name === 'TokenExpiredError') {
    return ApiResponse.error(
      res,
      'Token expired',
      401
    );
  }

  // Default error
  return ApiResponse.error(
    res,
    err.message || 'Server Error',
    err.statusCode || 500
  );
};

module.exports = errorHandler;
