const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Loại bỏ các tùy chọn không cần thiết và gây cảnh báo
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
