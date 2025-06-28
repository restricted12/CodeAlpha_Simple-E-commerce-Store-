const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../middleware/auth');

// Create a new user (register)
router.post('/create-account', userController.createUser);

// Login user
router.post('/login', userController.loginUser);

// Protect all routes below with auth middleware
router.use(auth);

// Get current user profile
router.get('/profile', userController.getCurrentUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
