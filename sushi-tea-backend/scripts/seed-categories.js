require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Category = require('../models/Category');

// Danh sách categories từ menu
const categories = [
  {
    name: 'Đá Xay',
    slug: 'da-xay',
    description: 'Các loại đồ uống đá xay',
    order: 1,
    isActive: true
  },
  {
    name: 'Trà Hoa Quả',
    slug: 'tra-hoa-qua',
    description: 'Các loại trà trái cây',
    order: 2,
    isActive: true
  },
  {
    name: 'Nước Ép',
    slug: 'nuoc-ep',
    description: 'Các loại nước ép trái cây',
    order: 3,
    isActive: true
  },
  {
    name: 'Trà Sữa',
    slug: 'tra-sua',
    description: 'Các loại trà sữa',
    order: 4,
    isActive: true
  },
  {
    name: 'Trà Chanh',
    slug: 'tra-chanh',
    description: 'Các loại trà chanh',
    order: 5,
    isActive: true
  },
  {
    name: 'Sữa Chua',
    slug: 'sua-chua',
    description: 'Các loại sữa chua',
    order: 6,
    isActive: true
  },
  {
    name: 'Sâm Bí Đao',
    slug: 'sam-bi-dao',
    description: 'Các loại sâm và bí đao',
    order: 7,
    isActive: true
  },
  {
    name: 'Bia & Đồ Uống Có Cồn',
    slug: 'bia-do-uong-co-con',
    description: 'Bia và các đồ uống có cồn',
    order: 8,
    isActive: true
  },
  {
    name: 'Coffee',
    slug: 'coffee',
    description: 'Các loại cà phê',
    order: 9,
    isActive: true
  },
  {
    name: 'Topping',
    slug: 'topping',
    description: 'Topping để thêm vào đồ uống',
    order: 10,
    isActive: true
  },
  {
    name: 'Đồ Ăn Vặt',
    slug: 'do-an-vat',
    description: 'Các loại đồ ăn vặt',
    order: 11,
    isActive: true
  }
];

// Hàm seed categories
const seedCategories = async () => {
  try {
    await connectDB();
    console.log('🔄 Xóa categories hiện tại...');
    await Category.deleteMany({});
    
    console.log('🌱 Đang thêm categories...');
    await Category.insertMany(categories);
    
    console.log('✅ Thêm categories thành công!');
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi khi seed categories:', error);
    process.exit(1);
  }
};

seedCategories();
