import dotenv from 'dotenv';
import mongoose from 'mongoose';

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
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n🔧 MongoDB Setup Guide:');
      console.log('1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/');
      console.log('2. Start MongoDB service: mongod');
      console.log('3. Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas');
      console.log('4. Create .env file with MONGODB_URI=mongodb://localhost:27017/campus_news');
    }
    
    process.exit(1);
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