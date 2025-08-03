import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

const testConnection = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully!');

    // Delete existing test user if exists
    await User.deleteOne({ username: 'testuser' });
    console.log('Deleted existing test user if any');

    // Create new test user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const newUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User'
    });

    await newUser.save();
    console.log('Test user created successfully!');

    // Verify the user
    const user = await User.findOne({ username: 'testuser' });
    console.log('Found user:', user);

    // Test password
    const isMatch = await bcrypt.compare('password123', user.password);
    console.log('Password match:', isMatch);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

testConnection(); 