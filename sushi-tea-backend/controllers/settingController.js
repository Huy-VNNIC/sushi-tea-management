const Setting = require('../models/Setting');
const ApiResponse = require('../utils/apiResponse');

// @desc    Lấy tất cả cài đặt
// @route   GET /api/admin/settings
// @access  Private/Admin
exports.getSettings = async (req, res, next) => {
  try {
    // Filter theo group
    const filter = {};
    if (req.query.group) {
      filter.group = req.query.group;
    }

    const settings = await Setting.find(filter).sort({ group: 1, key: 1 });
    
    // Nhóm theo group
    const grouped = settings.reduce((result, setting) => {
      if (!result[setting.group]) {
        result[setting.group] = [];
      }
      
      result[setting.group].push(setting);
      return result;
    }, {});
    
    ApiResponse.success(res, { settings: grouped }, 'Lấy cài đặt thành công');
  } catch (error) {
    console.error('Error in getSettings:', error);
    next(error);
  }
};

// @desc    Lấy cài đặt theo key
// @route   GET /api/admin/settings/:key
// @access  Private/Admin
exports.getSetting = async (req, res, next) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    
    if (!setting) {
      return ApiResponse.error(res, 'Không tìm thấy cài đặt', 404);
    }
    
    ApiResponse.success(res, { setting }, 'Lấy cài đặt thành công');
  } catch (error) {
    console.error('Error in getSetting:', error);
    next(error);
  }
};

// @desc    Tạo hoặc cập nhật cài đặt
// @route   PUT /api/admin/settings/:key
// @access  Private/Admin
exports.updateSetting = async (req, res, next) => {
  try {
    const { value, type, description, group } = req.body;
    const key = req.params.key;
    
    if (value === undefined) {
      return ApiResponse.error(res, 'Giá trị là bắt buộc', 400);
    }
    
    // Xác định kiểu dữ liệu
    let valueType = type || 'string';
    if (!type) {
      if (typeof value === 'number') valueType = 'number';
      else if (typeof value === 'boolean') valueType = 'boolean';
      else if (Array.isArray(value)) valueType = 'array';
      else if (typeof value === 'object' && value !== null) valueType = 'object';
    }
    
    // Tìm và cập nhật hoặc tạo mới
    const setting = await Setting.findOneAndUpdate(
      { key },
      {
        key,
        value,
        type: valueType,
        description: description || '',
        group: group || 'general',
        updatedAt: Date.now()
      },
      { new: true, upsert: true }
    );
    
    ApiResponse.success(res, { setting }, 'Cập nhật cài đặt thành công');
  } catch (error) {
    console.error('Error in updateSetting:', error);
    next(error);
  }
};

// @desc    Xóa cài đặt
// @route   DELETE /api/admin/settings/:key
// @access  Private/Admin
exports.deleteSetting = async (req, res, next) => {
  try {
    const setting = await Setting.findOneAndDelete({ key: req.params.key });
    
    if (!setting) {
      return ApiResponse.error(res, 'Không tìm thấy cài đặt', 404);
    }
    
    ApiResponse.success(res, {}, 'Xóa cài đặt thành công');
  } catch (error) {
    console.error('Error in deleteSetting:', error);
    next(error);
  }
};

// @desc    Cập nhật nhiều cài đặt cùng lúc
// @route   PUT /api/admin/settings
// @access  Private/Admin
exports.updateMultipleSettings = async (req, res, next) => {
  try {
    const { settings } = req.body;
    
    if (!settings || !Array.isArray(settings) || settings.length === 0) {
      return ApiResponse.error(res, 'Dữ liệu không hợp lệ', 400);
    }
    
    const operations = settings.map(({ key, value, type, description, group }) => ({
      updateOne: {
        filter: { key },
        update: {
          key,
          value,
          type: type || typeof value,
          description: description || '',
          group: group || 'general',
          updatedAt: Date.now()
        },
        upsert: true
      }
    }));
    
    await Setting.bulkWrite(operations);
    
    const updatedSettings = await Setting.find({
      key: { $in: settings.map(s => s.key) }
    });
    
    ApiResponse.success(res, { settings: updatedSettings }, 'Cập nhật nhiều cài đặt thành công');
  } catch (error) {
    console.error('Error in updateMultipleSettings:', error);
    next(error);
  }
};
