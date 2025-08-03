import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Default MongoDB connection string for local setup
    const defaultMongoURI = 'mongodb://localhost:27017/campus_news';
    
    // Use environment variable or default
    const mongoURI = process.env.MONGODB_URI || defaultMongoURI;
    
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 MongoDB URI:', mongoURI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log(`🗄️  Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log(`📡 Port: ${conn.connection.port}`);
    
    // Create default data if needed
    await createDefaultData();
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n🔧 MongoDB Setup Guide:');
      console.log('1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/');
      console.log('2. Start MongoDB service: mongod');
      console.log('3. Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas');
      console.log('4. Update MONGODB_URI in .env file');
    }
    
    process.exit(1);
  }
};

// Create default data for demo purposes
const createDefaultData = async () => {
  try {
    const User = mongoose.model('User');
    
    // Check if demo user exists
    const existingUser = await User.findOne({ username: 'demo_student' });
    
    if (!existingUser) {
      // Create demo user
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.default.hash('demo123', 10);
      
      await User.create({
        username: 'demo_student',
        email: 'demo@campus.edu',
        password: hashedPassword,
        profilePic: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600',
        bio: 'Demo student account for testing Campus News app'
      });
      
      console.log('✅ Demo user created successfully!');
      console.log('   Username: demo_student');
      console.log('   Password: demo123');
    }
  } catch (error) {
    console.log('ℹ️  Default data creation skipped (models not ready yet)');
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📡 Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('📡 MongoDB connection closed through app termination');
  process.exit(0);
});

export default connectDB; 