/**
 * Lớp tiện ích cho việc trả về API response
 */
class ApiResponse {
  /**
   * Trả về response thành công
   * @param {object} res - Express response object
   * @param {object} data - Dữ liệu trả về
   * @param {string} message - Thông báo thành công
   * @param {number} statusCode - HTTP status code
   */
  static success(res, data = {}, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  /**
   * Trả về response lỗi
   * @param {object} res - Express response object
   * @param {string} message - Thông báo lỗi
   * @param {number} statusCode - HTTP status code
   * @param {object} errors - Chi tiết lỗi (nếu có)
   */
  static error(res, message = 'Error occurred', statusCode = 400, errors = {}) {
    return res.status(statusCode).json({
      success: false,
      error: {
        code: statusCode,
        message,
        errors
      }
    });
  }
}

module.exports = ApiResponse;
