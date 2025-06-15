require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('../config/database');

// Import Models
const User = require('../models/User');

// Dữ liệu mẫu
const seedUsers = [
  {
    email: 'admin@sushitea.com',
    password: 'admin123',
    fullName: 'Admin User',
    role: 'admin',
    phone: '0901234567'
  },
  {
    email: 'staff@sushitea.com',
    password: 'staff123',
    fullName: 'Staff User',
    role: 'staff',
    phone: '0901234568'
  },
  {
    email: 'customer@sushitea.com',
    password: 'customer123',
    fullName: 'Customer User',
    role: 'customer',
    phone: '0901234569'
  }
];

// Hàm seed dữ liệu
const seedDatabase = async () => {
  try {
    // Kết nối đến database
    await connectDB();
    
    console.log('🌱 Bắt đầu seeding dữ liệu...');
    
    // Seed users
    console.log('Seeding users...');
    await User.deleteMany({});
    
    // Hash passwords
    const hashedUsers = await Promise.all(
      seedUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );
    
    await User.insertMany(hashedUsers);
    console.log('Users seeded successfully ✅');
    
    console.log('🎉 Seeding hoàn tất!');
    mongoose.disconnect();
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Chạy hàm seed
seedDatabase();
