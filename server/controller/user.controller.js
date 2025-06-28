const userService = require('../services/user.service');

// Create a new user
async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Login user
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await userService.loginUser(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

// Get current user profile
async function getCurrentUser(req, res) {
  try {
    const user = await userService.getUserById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    
    res.json(userResponse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get a user by ID
async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update a user by ID
async function updateUser(req, res) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
