const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');
const Category = require('../models/Category');
const ApiResponse = require('../utils/apiResponse');
const mongoose = require('mongoose');

// @desc    Lấy thống kê tổng quan
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Lấy ngày hiện tại
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Lấy ngày đầu tháng
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Lấy ngày đầu năm
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    // Thống kê đơn hàng
    const [
      totalOrders,
      totalRevenue,
      ordersToday,
      revenueToday,
      ordersThisMonth,
      revenueThisMonth,
      ordersThisYear,
      revenueThisYear,
      ordersByStatus
    ] = await Promise.all([
      // Tổng số đơn hàng
      Order.countDocuments(),
      
      // Tổng doanh thu
      Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // Đơn hàng hôm nay
      Order.countDocuments({
        createdAt: { $gte: today }
      }),
      
      // Doanh thu hôm nay
      Order.aggregate([
        { 
          $match: { 
            createdAt: { $gte: today },
            status: { $ne: 'cancelled' }
          } 
        },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // Đơn hàng tháng này
      Order.countDocuments({
        createdAt: { $gte: startOfMonth }
      }),
      
      // Doanh thu tháng này
      Order.aggregate([
        { 
          $match: { 
            createdAt: { $gte: startOfMonth },
            status: { $ne: 'cancelled' }
          } 
        },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // Đơn hàng năm nay
      Order.countDocuments({
        createdAt: { $gte: startOfYear }
      }),
      
      // Doanh thu năm nay
      Order.aggregate([
        { 
          $match: { 
            createdAt: { $gte: startOfYear },
            status: { $ne: 'cancelled' }
          } 
        },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // Đơn hàng theo trạng thái
      Order.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    // Thống kê sản phẩm và người dùng
    const [
      totalMenuItems,
      totalCategories,
      totalUsers,
      bestSellingItems
    ] = await Promise.all([
      // Tổng số sản phẩm
      MenuItem.countDocuments(),
      
      // Tổng số danh mục
      Category.countDocuments(),
      
      // Tổng số người dùng
      User.countDocuments(),
      
      // Sản phẩm bán chạy nhất
      Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.menuItem',
            name: { $first: '$items.name' },
            totalSold: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
          }
        },
        { $sort: { totalSold: -1 } },
        { $limit: 10 }
      ])
    ]);

    // Định dạng dữ liệu
    const orderStatsByStatus = {};
    ordersByStatus.forEach(status => {
      orderStatsByStatus[status._id] = status.count;
    });

    const stats = {
      orders: {
        total: totalOrders,
        today: ordersToday,
        thisMonth: ordersThisMonth,
        thisYear: ordersThisYear,
        byStatus: orderStatsByStatus
      },
      revenue: {
        total: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
        today: revenueToday.length > 0 ? revenueToday[0].total : 0,
        thisMonth: revenueThisMonth.length > 0 ? revenueThisMonth[0].total : 0,
        thisYear: revenueThisYear.length > 0 ? revenueThisYear[0].total : 0
      },
      products: {
        total: totalMenuItems,
        categories: totalCategories,
        bestSellers: bestSellingItems
      },
      users: {
        total: totalUsers
      }
    };

    ApiResponse.success(res, { stats }, 'Lấy thống kê thành công');
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    next(error);
  }
};

// @desc    Lấy doanh thu theo thời gian
// @route   GET /api/admin/dashboard/revenue
// @access  Private/Admin
exports.getRevenueStats = async (req, res, next) => {
  try {
    const { period } = req.query;
    let timeFormat, groupBy, dateFormat, startDate, endDate;
    
    const now = new Date();

    // Cấu hình khoảng thời gian và định dạng
    switch (period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
        groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
        dateFormat = 'YYYY-MM-DD';
        break;
      case 'month':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
        groupBy = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
        dateFormat = 'YYYY-MM';
        break;
      case 'year':
        startDate = new Date(now.getFullYear() - 5, 0, 1);
        groupBy = { $dateToString: { format: '%Y', date: '$createdAt' } };
        dateFormat = 'YYYY';
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
        dateFormat = 'YYYY-MM-DD';
    }

    // Thực hiện truy vấn
    const revenueByTime = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          status: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: groupBy,
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    ApiResponse.success(res, { 
      revenue: revenueByTime,
      period,
      dateFormat
    }, 'Lấy thống kê doanh thu thành công');
  } catch (error) {
    console.error('Error in getRevenueStats:', error);
    next(error);
  }
};

// @desc    Lấy thống kê sản phẩm
// @route   GET /api/admin/dashboard/products
// @access  Private/Admin
exports.getProductStats = async (req, res, next) => {
  try {
    // Sản phẩm theo danh mục
    const productsByCategory = await MenuItem.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $group: {
          _id: '$category._id',
          category: { $first: '$category.name' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Thống kê khả dụng
    const availabilityStats = await MenuItem.aggregate([
      {
        $group: {
          _id: '$isAvailable',
          count: { $sum: 1 }
        }
      }
    ]);

    // Thống kê best seller
    const bestSellerStats = await MenuItem.aggregate([
      {
        $group: {
          _id: '$isBestSeller',
          count: { $sum: 1 }
        }
      }
    ]);

    // Định dạng dữ liệu
    const availability = {};
    availabilityStats.forEach(stat => {
      availability[stat._id ? 'available' : 'unavailable'] = stat.count;
    });

    const bestSeller = {};
    bestSellerStats.forEach(stat => {
      bestSeller[stat._id ? 'bestSeller' : 'regular'] = stat.count;
    });

    ApiResponse.success(res, {
      productsByCategory,
      availability,
      bestSeller
    }, 'Lấy thống kê sản phẩm thành công');
  } catch (error) {
    console.error('Error in getProductStats:', error);
    next(error);
  }
};
