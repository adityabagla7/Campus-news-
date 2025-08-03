# 🚀 Campus News - MongoDB Integration Guide

## 📋 **Project Overview**
This guide will help you connect the Campus News React app to MongoDB and complete the full-stack implementation.

## 🛠️ **Prerequisites**
- Node.js installed
- MongoDB Atlas account or local MongoDB
- Campus News project files
- Basic understanding of React and Express

---

## 🔧 **STEP 1: MongoDB Setup**

### **Option A: MongoDB Atlas (Recommended)**
```bash
# 1. Go to https://cloud.mongodb.com/
# 2. Create account and new cluster
# 3. Create database user with password
# 4. Whitelist your IP address (0.0.0.0/0 for development)
# 5. Get connection string: mongodb+srv://username:password@cluster.mongodb.net/campusnews
```

### **Option B: Local MongoDB**
```bash
# Install MongoDB locally
brew install mongodb-community@7.0  # macOS
# or
sudo apt-get install -y mongodb-org  # Ubuntu

# Start MongoDB service
brew services start mongodb-community@7.0  # macOS
# or
sudo systemctl start mongod  # Ubuntu

# Connection string: mongodb://localhost:27017/campusnews
```

---

## 🔧 **STEP 2: Backend Environment Setup**

### **Create .env file in API directory**
```bash
cd API
touch .env
```

### **Add environment variables to .env:**
```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campusnews?retryWrites=true&w=majority
DB_NAME=campusnews

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:3000

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## 🔧 **STEP 3: Install Required Dependencies**

### **Backend Dependencies**
```bash
cd API
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer helmet morgan compression express-rate-limit joi express-validator nodemailer

# Development dependencies
npm install --save-dev nodemon concurrently
```

### **Frontend Dependencies (if needed)**
```bash
cd client
npm install axios react-query @tanstack/react-query moment react-toastify
```

---

## 🔧 **STEP 4: Database Configuration**

### **Update API/config/database.js**
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## 🔧 **STEP 5: Enhanced Database Models**

### **User Model (API/models/User.js)**
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilePic: {
    type: String,
    default: '/default-avatar.png'
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    default: 'student'
  },
  department: String,
  year: String,
  bio: String,
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### **Post Model (API/models/Post.js)**
```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['Event', 'Academic', 'Announcement', 'Career', 'Sports', 'General'],
    default: 'General'
  },
  tags: [String],
  image: String,
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
```

---

## 🔧 **STEP 6: API Routes Implementation**

### **Auth Routes (API/routes/auth.js)**
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = new User({ name, email, password });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    user.lastLogin = new Date();
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

---

## 🔧 **STEP 7: Frontend Integration**

### **Update client/src/axios.js**
```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
```

### **Update client/src/context/authContext.js**
```javascript
import { createContext, useEffect, useState } from "react";
import API from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setCurrentUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await API.post('/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setCurrentUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API.get('/auth/me')
        .then(response => {
          setCurrentUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🔧 **STEP 8: Package.json Scripts**

### **Root package.json**
```json
{
  "name": "campus-news",
  "version": "1.0.0",
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd API && npm run dev",
    "client": "cd client && npm start",
    "build": "cd client && npm run build",
    "install-deps": "cd API && npm install && cd ../client && npm install"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
```

### **API package.json scripts**
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  }
}
```

---

## 🔧 **STEP 9: Complete API Server Setup**

### **Update API/index.js**
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined'));

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🔧 **STEP 10: Database Seeding (Optional)**

### **Create API/seeds/seedData.js**
```javascript
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    
    // Create sample users
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@student.university.edu',
        password: 'password123',
        role: 'student',
        department: 'Computer Science',
        year: '3rd Year'
      },
      {
        name: 'Jane Smith',
        email: 'jane@faculty.university.edu',
        password: 'password123',
        role: 'faculty',
        department: 'Mathematics'
      }
    ]);
    
    // Create sample posts
    await Post.create([
      {
        title: 'Welcome to Campus News!',
        content: 'This is the first post on our new campus news platform.',
        author: users[0]._id,
        category: 'General'
      },
      {
        title: 'Upcoming Tech Fest 2024',
        content: 'Join us for the annual technology festival featuring competitions and workshops.',
        author: users[1]._id,
        category: 'Event'
      }
    ]);
    
    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
```

---

## 🚀 **COMMANDS TO RUN**

### **1. Install Dependencies**
```bash
npm run install-deps
```

### **2. Seed Database (Optional)**
```bash
cd API && node seeds/seedData.js
```

### **3. Start Development Server**
```bash
npm run dev
```

### **4. Start Production**
```bash
# Backend
cd API && npm start

# Frontend (separate terminal)
cd client && npm run build && serve -s build
```

---

## 🎯 **CURSOR AI PROMPTS**

### **For Database Integration:**
```
"Connect this Campus News React app to MongoDB. Set up user authentication, posts CRUD operations, and real-time features. Create proper API endpoints for all the existing frontend features including events, groups, announcements, and library. Make sure to implement proper error handling and validation."
```

### **For API Development:**
```
"Create a complete REST API for the Campus News app with endpoints for:
1. User authentication (register, login, logout)
2. Posts (create, read, update, delete with categories)
3. Comments and likes
4. Events management
5. Groups functionality
6. Announcements system
7. Library resources
Include proper middleware for authentication, validation, and error handling."
```

### **For Frontend Integration:**
```
"Update the Campus News React app to use real API endpoints instead of hardcoded data. Implement proper authentication flow, API calls using axios, loading states, error handling, and real-time updates. Make sure all existing UI components work with the backend API."
```

---

## 🔍 **Testing Commands**

### **API Testing**
```bash
# Test authentication
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### **Database Connection Test**
```bash
cd API && node -e "
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));
"
```

---

## 📝 **Important Notes**

1. **Security**: Change all default passwords and secrets in production
2. **Environment**: Never commit .env files to version control
3. **CORS**: Update CORS settings for production domain
4. **Rate Limiting**: Adjust rate limits based on your needs
5. **File Uploads**: Configure proper file upload limits and validation
6. **Error Handling**: Implement comprehensive error logging
7. **Database Indexes**: Add indexes for better performance
8. **Backup**: Set up regular database backups

---

## 🚀 **Deployment Ready**

After completing this setup, your Campus News app will be:
- ✅ Connected to MongoDB
- ✅ Fully functional with real backend
- ✅ Ready for production deployment
- ✅ Scalable and maintainable
- ✅ Secure and optimized

**Good luck with your project! 🎉** 