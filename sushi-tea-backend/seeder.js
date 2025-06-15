const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Import User model after loading environment variables
const User = require('./models/User');

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the .env file');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully for seeding');
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// Create admin user
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@sushitea.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Create admin user
    const admin = await User.create({
      name: 'Sushi Tea Admin',
      email: 'admin@sushitea.com',
      phone: '0123456789',
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('Admin user created:', admin.email);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Create test user
const createTestUser = async () => {
  try {
    // Check if test user already exists
    const testUserExists = await User.findOne({ email: 'test@sushitea.com' });
    
    if (testUserExists) {
      console.log('Test user already exists');
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('test123', salt);
    
    // Create test user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@sushitea.com',
      phone: '0987654321',
      password: hashedPassword,
      role: 'user'
    });
    
    console.log('Test user created:', testUser.email);
  } catch (error) {
    console.error('Error creating test user:', error);
  }
};

// Run seeder function
const seedData = async () => {
  try {
    await createAdmin();
    await createTestUser();
    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
