const Table = require('../models/Table');
const ApiResponse = require('../utils/apiResponse');
const QRCode = require('qrcode');

/**
 * @desc    Get all tables
 * @route   GET /api/tables
 * @access  Private
 */
exports.getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().sort({ number: 1 });
    
    ApiResponse.success(res, {
      count: tables.length,
      tables
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single table
 * @route   GET /api/tables/:id
 * @access  Private
 */
exports.getTable = async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id);
    
    if (!table) {
      return ApiResponse.error(res, 'Table not found', 404);
    }
    
    ApiResponse.success(res, { table });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new table
 * @route   POST /api/tables
 * @access  Private/Admin
 */
exports.createTable = async (req, res, next) => {
  try {
    const { number, capacity, status, note } = req.body;
    
    // Check if table number already exists
    const existingTable = await Table.findOne({ number });
    if (existingTable) {
      return ApiResponse.error(res, 'Số bàn này đã tồn tại', 400);
    }
    
    // Generate QR code
    const baseUrl = process.env.CLIENT_URL || 'https://sushi-tea.com';
    const qrData = `${baseUrl}/order?table=${number}`;
    const qrCode = await QRCode.toDataURL(qrData);
    
    const table = await Table.create({
      number,
      capacity: capacity || 4,
      status: status || 'available',
      qrCode,
      note
    });
    
    ApiResponse.success(res, { table }, 'Thêm bàn thành công', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update table
 * @route   PUT /api/tables/:id
 * @access  Private/Admin
 */
exports.updateTable = async (req, res, next) => {
  try {
    let table = await Table.findById(req.params.id);
    
    if (!table) {
      return ApiResponse.error(res, 'Table not found', 404);
    }
    
    table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    ApiResponse.success(res, { table }, 'Cập nhật bàn thành công');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete table
 * @route   DELETE /api/tables/:id
 * @access  Private/Admin
 */
exports.deleteTable = async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id);
    
    if (!table) {
      return ApiResponse.error(res, 'Table not found', 404);
    }
    
    await table.remove();
    
    ApiResponse.success(res, {}, 'Xóa bàn thành công');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update table status
 * @route   PUT /api/tables/:id/status
 * @access  Private
 */
exports.updateTableStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['available', 'occupied', 'reserved', 'maintenance'].includes(status)) {
      return ApiResponse.error(res, 'Trạng thái không hợp lệ', 400);
    }
    
    const table = await Table.findById(req.params.id);
    
    if (!table) {
      return ApiResponse.error(res, 'Table not found', 404);
    }
    
    table.status = status;
    await table.save();
    
    ApiResponse.success(res, { table }, 'Cập nhật trạng thái bàn thành công');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Regenerate QR code
 * @route   PUT /api/tables/:id/qrcode
 * @access  Private/Admin
 */
exports.regenerateQRCode = async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id);
    
    if (!table) {
      return ApiResponse.error(res, 'Table not found', 404);
    }
    
    const baseUrl = process.env.CLIENT_URL || 'https://sushi-tea.com';
    const qrData = `${baseUrl}/order?table=${table.number}`;
    const qrCode = await QRCode.toDataURL(qrData);
    
    table.qrCode = qrCode;
    await table.save();
    
    ApiResponse.success(res, { table }, 'Tạo mới mã QR thành công');
  } catch (error) {
    next(error);
  }
};
