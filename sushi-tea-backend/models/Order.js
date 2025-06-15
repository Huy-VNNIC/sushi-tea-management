const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Số lượng phải lớn hơn 0']
  },
  note: {
    type: String
  },
  toppings: [{
    name: String,
    price: Number
  }]
});

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  customer: {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên khách hàng']
    },
    phone: {
      type: String,
      required: [true, 'Vui lòng nhập số điện thoại']
    },
    email: {
      type: String
    },
    address: {
      type: String
    }
  },
  items: [OrderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'banking', 'momo', 'zalopay'],
    default: 'cash'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  note: {
    type: String
  },
  table: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Tạo số order tự động trước khi lưu
OrderSchema.pre('save', async function(next) {
  // Nếu là order mới (chưa có orderNumber)
  if (!this.orderNumber) {
    const today = new Date();
    const prefix = `ST${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    
    // Tìm order với prefix của ngày hôm nay và lấy số lớn nhất
    const lastOrder = await this.constructor.findOne({
      orderNumber: new RegExp(`^${prefix}`)
    }).sort({ orderNumber: -1 });
    
    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }
    
    // Tạo mã order: ST + năm + tháng + ngày + 4 số sequence
    this.orderNumber = `${prefix}${String(sequence).padStart(4, '0')}`;
  }
  
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
