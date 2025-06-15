const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên món'],
    trim: true,
    maxlength: [100, 'Tên món không quá 100 ký tự']
  },
  description: {
    type: String,
    maxlength: [500, 'Mô tả không quá 500 ký tự']
  },
  price: {
    type: Number,
    required: [true, 'Vui lòng nhập giá']
  },
  discountPrice: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Vui lòng chọn danh mục']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
