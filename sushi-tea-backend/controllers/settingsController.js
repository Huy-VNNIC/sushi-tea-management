const ApiResponse = require('../utils/apiResponse');
const Settings = require('../models/Settings');

/**
 * @desc    Lấy tất cả cài đặt hệ thống
 * @route   GET /api/admin/settings
 * @access  Private/Admin
 */
exports.getSettings = async (req, res, next) => {
  try {
    // Trong thực tế, bạn sẽ lấy dữ liệu từ database
    // Ở đây mình sẽ trả về dữ liệu mẫu cố định
    
    const settings = {
      general: [
        { key: 'storeName', value: 'Sushi Tea', type: 'text' },
        { key: 'storeAddress', value: '123 Đường ABC, Quận XYZ, TP. HCM', type: 'text' },
        { key: 'storePhone', value: '0123456789', type: 'text' },
        { key: 'storeEmail', value: 'info@sushitea.com', type: 'text' }
      ],
      social: [
        { key: 'socialLinks', value: {
          facebook: 'https://facebook.com/sushitea',
          instagram: 'https://instagram.com/sushitea'
        }, type: 'object' }
      ],
      payment: [
        { key: 'bankingInfo', value: {
          bankName: 'Techcombank',
          accountNumber: '0123456789',
          accountHolder: 'QUAN SUSHI TEA'
        }, type: 'object' },
        { key: 'enableMomo', value: true, type: 'boolean' },
        { key: 'enableZaloPay', value: true, type: 'boolean' }
      ]
    };
    
    ApiResponse.success(res, { settings }, 'Settings retrieved successfully');
  } catch (error) {
    console.error('Error in getSettings:', error);
    next(error);
  }
};

/**
 * @desc    Cập nhật một cài đặt
 * @route   PUT /api/admin/settings/:key
 * @access  Private/Admin
 */
exports.updateSetting = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    
    // Trong thực tế, bạn sẽ cập nhật dữ liệu vào database
    // Ở đây chỉ trả về kết quả thành công giả
    
    ApiResponse.success(res, { key, value }, 'Setting updated successfully');
  } catch (error) {
    console.error('Error in updateSetting:', error);
    next(error);
  }
};

/**
 * @desc    Lấy các cài đặt công khai
 * @route   GET /api/settings/public
 * @access  Public
 */
exports.getPublicSettings = async (req, res, next) => {
  try {
    // Chỉ trả về những cài đặt công khai
    const publicSettings = {
      general: [
        { key: 'storeName', value: 'Sushi Tea', type: 'text' },
        { key: 'storeAddress', value: '123 Đường ABC, Quận XYZ, TP. HCM', type: 'text' },
        { key: 'storePhone', value: '0123456789', type: 'text' },
        { key: 'storeEmail', value: 'info@sushitea.com', type: 'text' }
      ],
      social: [
        { key: 'socialLinks', value: {
          facebook: 'https://facebook.com/sushitea',
          instagram: 'https://instagram.com/sushitea'
        }, type: 'object' }
      ]
    };
    
    ApiResponse.success(res, { settings: publicSettings }, 'Public settings retrieved successfully');
  } catch (error) {
    console.error('Error in getPublicSettings:', error);
    next(error);
  }
};
