const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Import routes
const menuRoutes = require('./routes/menuRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Nếu file toppingRoutes tồn tại, import nó
let toppingRoutes;
try {
  toppingRoutes = require('./routes/toppingRoutes');
} catch (err) {
  console.log('Topping routes not available yet.');
}

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Sửa CORS để chấp nhận cổng 3001
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  credentials: true
}));

app.use(helmet());
app.use(morgan('dev'));

// Mount routes
app.use('/api/menu', menuRoutes);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);

// Mount toppingRoutes nếu có
if (toppingRoutes) {
  app.use('/api/toppings', toppingRoutes);
}

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Sushi Tea API is running',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: { 
      code: 404,
      message: `Route ${req.originalUrl} not found` 
    } 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: {
      code: 500,
      message: err.message || 'Server Error'
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
