require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Topping = require('../models/Topping');

const seedToppings = async () => {
  try {
    await connectDB();
    
    console.log('🔄 Xóa toppings hiện tại...');
    await Topping.deleteMany({});
    
    console.log('🌱 Đang thêm toppings...');
    
    // Danh sách toppings
    const toppings = [
      {
        name: 'Trân Châu Đen',
        price: 5000,
        isAvailable: true
      },
      {
        name: 'Thạch Trái Cây',
        price: 5000,
        isAvailable: true
      },
      {
        name: 'Pudding',
        price: 7000,
        isAvailable: true
      },
      {
        name: 'Kem Cheese',
        price: 10000,
        isAvailable: true
      },
      {
        name: 'Thạch Cà Phê',
        price: 5000,
        isAvailable: true
      },
      {
        name: 'Trân Châu Trắng',
        price: 5000,
        isAvailable: true
      },
      {
        name: 'Thạch Dừa',
        price: 5000,
        isAvailable: true
      },
      {
        name: 'Thạch Lá Dứa',
        price: 5000,
        isAvailable: true
      },
      {
        name: 'Thạch Nha Đam',
        price: 5000,
        isAvailable: true
      },
      {
        name: 'Đậu Đỏ',
        price: 7000,
        isAvailable: true
      }
    ];
    
    await Topping.insertMany(toppings);
    
    console.log('✅ Thêm toppings thành công!');
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi khi seed toppings:', error);
    process.exit(1);
  }
};

seedToppings();
