// routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'user'
    });

    // Save user in the database
    const newUser = await user.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      // Passwords match
      const authToken = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET);
      res.json({ message: "Login successful", username: user.username, authToken, role: user.role });
    } else {
      // Authentication failed
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: "Error logging in", error: error });
  }
});

module.exports = router;