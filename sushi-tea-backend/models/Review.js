const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: [true, 'Đánh giá sao là bắt buộc'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: [1000, 'Bình luận không được vượt quá 1000 ký tự']
  },
  images: {
    type: [String],
    default: []
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Tạo index để tăng tốc độ truy vấn
ReviewSchema.index({ orderId: 1 });
ReviewSchema.index({ userId: 1 });
ReviewSchema.index({ rating: 1 });

module.exports = mongoose.model('Review', ReviewSchema);
