require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const seedAdmin = async () => {
  try {
    await connectDB();
    
    console.log('Kiểm tra tài khoản admin...');
    
    // Kiểm tra admin đã tồn tại
    const adminExists = await User.findOne({ email: 'admin@sushitea.com' });
    
    if (adminExists) {
      console.log('Tài khoản admin đã tồn tại!');
      process.exit();
    }
    
    // Tạo admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@sushitea.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('✅ Tài khoản admin đã được tạo:');
    console.log(`Email: ${admin.email}`);
    console.log(`Mật khẩu: admin123`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi khi tạo tài khoản admin:', error);
    process.exit(1);
  }
};

seedAdmin();
