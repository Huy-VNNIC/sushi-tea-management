const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Lấy thống kê dashboard
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
exports.getDashboardStats = async (req, res, next) => {
  try {
    const stats = {
      totalOrders: 120,
      totalRevenue: 15000000,
      newCustomers: 25,
      pendingOrders: 8
    };
    
    ApiResponse.success(res, { stats }, 'Dashboard stats retrieved successfully');
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    next(error);
  }
};
