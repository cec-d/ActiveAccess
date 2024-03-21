// routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user
    const user = new User({
      username: req.body.username,
      password: hashedPassword
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
      const authToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
      res.json({ message: "Login successful", username: user.username, authToken });
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