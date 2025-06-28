const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
async function createUser(data) {
  const user = new User(data);
  const savedUser = await user.save();
  
  // Generate JWT token
  const token = jwt.sign(
    { userId: savedUser._id, email: savedUser.email },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '24h' }
  );

  // Return user data (without password) and token
  const userResponse = {
    _id: savedUser._id,
    name: savedUser.name,
    email: savedUser.email,
    createdAt: savedUser.createdAt,
    updatedAt: savedUser.updatedAt
  };

  return { user: userResponse, token };
}

// Login user
async function loginUser(email, password) {
  // Find user by email
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '24h' }
  );
  console.log(token);

  // Return user data (without password) and token
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };

  return { user: userResponse, token };
}

// Get user by email
async function getUserByEmail(email) {
  return await User.findOne({ email: email.toLowerCase() });
}

// Get all users
async function getAllUsers() {
  return await User.find();
}

// Get a user by ID
async function getUserById(id) {
  return await User.findById(id);
}

// Update a user by ID
async function updateUser(id, data) {
  return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

// Delete a user by ID
async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  createUser,
  loginUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
