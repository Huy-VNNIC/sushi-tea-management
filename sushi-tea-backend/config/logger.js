const winston = require('winston');

// Định dạng timestamp
const timestampFormat = winston.format((info) => {
  const date = new Date();
  info.timestamp = date.toISOString().replace('T', ' ').substring(0, 19);
  return info;
});

// Tạo logger với winston
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    timestampFormat(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Đảm bảo thư mục logs tồn tại
const fs = require('fs');
const dir = './logs';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

module.exports = logger;
