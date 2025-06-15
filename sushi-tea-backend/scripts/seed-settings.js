require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Setting = require('../models/Setting');

const seedSettings = async () => {
  try {
    await connectDB();
    
    console.log('Kiểm tra cài đặt hệ thống...');
    
    // Cài đặt mặc định
    const defaultSettings = [
      {
        key: 'storeName',
        value: 'Sushi Tea',
        type: 'string',
        description: 'Tên cửa hàng',
        group: 'general'
      },
      {
        key: 'storeDescription',
        value: 'Quán đồ uống và đồ ăn vặt',
        type: 'string',
        description: 'Mô tả ngắn về cửa hàng',
        group: 'general'
      },
      {
        key: 'storeAddress',
        value: '123 Đường ABC, Quận XYZ, TP. HCM',
        type: 'string',
        description: 'Địa chỉ cửa hàng',
        group: 'contact'
      },
      {
        key: 'storePhone',
        value: '0123456789',
        type: 'string',
        description: 'Số điện thoại cửa hàng',
        group: 'contact'
      },
      {
        key: 'storeEmail',
        value: 'info@sushitea.com',
        type: 'string',
        description: 'Email liên hệ',
        group: 'contact'
      },
      {
        key: 'logoUrl',
        value: '',
        type: 'string',
        description: 'URL logo cửa hàng',
        group: 'appearance'
      },
      {
        key: 'colorPrimary',
        value: '#1890ff',
        type: 'string',
        description: 'Màu chủ đạo',
        group: 'appearance'
      },
      {
        key: 'enableOnlineOrder',
        value: true,
        type: 'boolean',
        description: 'Bật/tắt đặt hàng online',
        group: 'orders'
      },
      {
        key: 'taxRate',
        value: 8,
        type: 'number',
        description: 'Tỷ lệ thuế (%)',
        group: 'orders'
      },
      {
        key: 'bankingInfo',
        value: {
          bankName: process.env.BANK_NAME || 'Techcombank',
          accountNumber: process.env.BANK_ACCOUNT_NUMBER || '0123456789',
          accountHolder: process.env.ACCOUNT_HOLDER || 'QUAN SUSHI TEA',
        },
        type: 'object',
        description: 'Thông tin ngân hàng',
        group: 'payment'
      },
      {
        key: 'socialLinks',
        value: {
          facebook: 'https://facebook.com/sushitea',
          instagram: 'https://instagram.com/sushitea',
          tiktok: 'https://tiktok.com/@sushitea'
        },
        type: 'object',
        description: 'Liên kết mạng xã hội',
        group: 'contact'
      }
    ];
    
    // Kiểm tra và thêm từng cài đặt
    for (const setting of defaultSettings) {
      const exists = await Setting.findOne({ key: setting.key });
      
      if (!exists) {
        await Setting.create({
          ...setting,
          updatedAt: Date.now()
        });
        console.log(`✅ Đã thêm cài đặt: ${setting.key}`);
      } else {
        console.log(`🔄 Cài đặt đã tồn tại: ${setting.key}`);
      }
    }
    
    console.log('✅ Hoàn thành thiết lập cài đặt!');
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi khi tạo cài đặt:', error);
    process.exit(1);
  }
};

seedSettings();
