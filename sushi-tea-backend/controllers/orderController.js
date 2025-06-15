const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const ApiResponse = require('../utils/apiResponse');

// @desc    Tạo đơn hàng mới
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res, next) => {
  try {
    const {
      customer,
      items,
      totalAmount,
      paymentMethod,
      note,
      table
    } = req.body;

    // Validate input
    if (!customer || !items || items.length === 0) {
      return ApiResponse.error(res, 'Vui lòng nhập thông tin khách hàng và sản phẩm', 400);
    }

    // Validate items
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return ApiResponse.error(res, `Sản phẩm ${item.name} không tồn tại`, 400);
      }

      if (!menuItem.isAvailable) {
        return ApiResponse.error(res, `Sản phẩm ${menuItem.name} hiện không có sẵn`, 400);
      }

      // Cập nhật giá từ database nếu không trùng khớp
      if (menuItem.price !== item.price) {
        item.price = menuItem.price;
      }
    }

    // Tính lại tổng tiền
    const calculatedTotal = items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const toppingTotal = item.toppings?.reduce((acc, topping) => acc + topping.price, 0) || 0;
      return total + itemTotal + toppingTotal * item.quantity;
    }, 0);

    // Tạo order
    const order = await Order.create({
      customer,
      items,
      totalAmount: calculatedTotal,
      paymentMethod: paymentMethod || 'cash',
      note,
      table,
      // Nếu có user đăng nhập
      user: req.user ? req.user.id : null
    });

    ApiResponse.success(res, { order }, 'Tạo đơn hàng thành công', 201);
  } catch (error) {
    console.error('Error in createOrder:', error);
    next(error);
  }
};

// @desc    Lấy tất cả đơn hàng
// @route   GET /api/orders
// @access  Private/Admin/Staff
exports.getOrders = async (req, res, next) => {
  try {
    // Lọc theo status nếu có
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Lọc theo ngày nếu có
    if (req.query.date) {
      const date = new Date(req.query.date);
      filter.createdAt = {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lte: new Date(date.setHours(23, 59, 59, 999))
      };
    }

    // Paging
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Tìm orders
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name');

    // Đếm tổng số orders để paging
    const total = await Order.countDocuments(filter);

    ApiResponse.success(res, { 
      orders, 
      pagination: {
        current: page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, 'Lấy danh sách đơn hàng thành công');
  } catch (error) {
    console.error('Error in getOrders:', error);
    next(error);
  }
};

// @desc    Lấy chi tiết đơn hàng
// @route   GET /api/orders/:id
// @access  Private/Admin/Staff
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name')
      .populate({
        path: 'items.menuItem',
        select: 'name image'
      });

    if (!order) {
      return ApiResponse.error(res, 'Không tìm thấy đơn hàng', 404);
    }

    ApiResponse.success(res, { order }, 'Lấy chi tiết đơn hàng thành công');
  } catch (error) {
    console.error('Error in getOrder:', error);
    next(error);
  }
};

// @desc    Cập nhật trạng thái đơn hàng
// @route   PUT /api/orders/:id/status
// @access  Private/Admin/Staff
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return ApiResponse.error(res, 'Vui lòng nhập trạng thái', 400);
    }

    // Tìm và cập nhật order
    const order = await Order.findById(req.params.id);

    if (!order) {
      return ApiResponse.error(res, 'Không tìm thấy đơn hàng', 404);
    }

    order.status = status;
    order.updatedAt = Date.now();
    await order.save();

    ApiResponse.success(res, { order }, 'Cập nhật trạng thái đơn hàng thành công');
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    next(error);
  }
};

// @desc    Huỷ đơn hàng
// @route   PUT /api/orders/:id/cancel
// @access  Private/Admin/Staff
exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return ApiResponse.error(res, 'Không tìm thấy đơn hàng', 404);
    }

    // Chỉ có thể huỷ đơn hàng ở trạng thái pending hoặc confirmed
    if (order.status !== 'pending' && order.status !== 'confirmed') {
      return ApiResponse.error(res, 'Không thể huỷ đơn hàng ở trạng thái này', 400);
    }

    order.status = 'cancelled';
    order.updatedAt = Date.now();
    await order.save();

    ApiResponse.success(res, { order }, 'Huỷ đơn hàng thành công');
  } catch (error) {
    console.error('Error in cancelOrder:', error);
    next(error);
  }
};
