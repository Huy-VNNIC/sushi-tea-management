const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên khuyến mãi là bắt buộc'],
    trim: true,
    maxlength: [100, 'Tên không được vượt quá 100 ký tự']
  },
  code: {
    type: String,
    required: [true, 'Mã khuyến mãi là bắt buộc'],
    unique: true,
    uppercase: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed_amount'],
    required: true
  },
  value: {
    type: Number,
    required: [true, 'Giá trị khuyến mãi là bắt buộc'],
    min: [0, 'Giá trị không được âm']
  },
  minOrderValue: {
    type: Number,
    default: 0,
    min: 0
  },
  maxDiscount: {
    type: Number,
    min: 0
  },
  applicableItems: {
    type: [String],
    default: []
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usageLimit: {
    type: Number,
    default: 0
  },
  usageCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Tạo index để tăng tốc độ truy vấn
PromotionSchema.index({ code: 1 }, { unique: true });
PromotionSchema.index({ startDate: 1, endDate: 1 });
PromotionSchema.index({ isActive: 1 });

module.exports = mongoose.model('Promotion', PromotionSchema);
