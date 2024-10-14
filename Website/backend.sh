#!/bin/bash

# Create necessary directories
mkdir -p backend
cd backend
mkdir -p config controllers models routes

# Initialize npm and install dependencies
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cors

# Create server.js file
cat > server.js <<EOL
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOL

# Create config/db.js for database connection
cat > config/db.js <<EOL
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;
EOL

# Create .env file with provided information
cat > .env <<EOL
PORT=5000
MONGODB_URI=mongodb+srv://dbUser:<A.FM_hp8@evj5VY>@cluster0.rcgwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=09c08b77996ee2bc59aed566227753557e2d7102cf9f02776c01d869a95b7
EOL

# Create models/User.js
cat > models/User.js <<EOL
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'seller', 'shopper'],
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
EOL

# Create routes/userRoutes.js
cat > routes/userRoutes.js <<EOL
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.put('/user/:id', updateUserRole);
router.delete('/user/:id', deleteUser);

module.exports = router;
EOL

# Create controllers/userController.js
cat > controllers/userController.js <<EOL
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });
    
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.findOne({ username, role });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials or role' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Users (Admin only)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User Role
const updateUserRole = async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.role = role;
      await user.save();
      res.json({ message: 'User role updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUserRole,
  deleteUser,
};
EOL

# Add backend entry point to run the server
echo "Backend setup complete. To run the server, use: 'npm start'"
