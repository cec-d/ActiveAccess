const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    try {
      // Extract authorization token from request headers
      const authToken = req.headers.authorization;
      if (!authToken) {
        return res.status(401).json({ message: 'Authorization token not provided' });
      }
  
      // Extract user ID from JWT token
      const token = authToken.split(' ')[1]; // Remove 'Bearer' prefix
      const decodedToken = jwt.verify(token, 'test1234'); // Verify and decode the token
      const username = decodedToken.username;
  
      // Find the user by Username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const { classId } = req.body;
        if (user.bookedClasses.includes(classId)) {
            return res.status(400).json({ message: 'Class already booked' });
        }
      // Add classId to user's bookedClasses array
      user.bookedClasses.push(classId);
      await user.save();
  
      res.status(200).json({ message: 'Class booked successfully'});
    } catch (error) {
      console.error('Error booking class:', error);
      res.status(500).json({ message: 'Error booking class' });
    }
  });

  router.get('/', async (req, res) => {
    try {
        // Extract authorization token from request headers
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ message: 'Authorization token not provided' });
        }

        // Extract user ID from JWT token
        const token = authToken.split(' ')[1]; // Remove 'Bearer' prefix
        const decodedToken = jwt.verify(token, 'test1234'); // Verify and decode the token
        const username = decodedToken.username;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the booked classes
        res.status(200).json({ bookedClasses: user.bookedClasses });
    } catch (error) {
        console.error('Error fetching booked classes:', error);
        res.status(500).json({ message: 'Error fetching booked classes' });
    }
});

router.delete('/:classId', async (req, res) => {
    try {
      // Extract authorization token from request headers
      const authToken = req.headers.authorization;
      if (!authToken) {
        return res.status(401).json({ message: 'Authorization token not provided' });
      }
  
      // Extract user ID from JWT token
      const token = authToken.split(' ')[1]; // Remove 'Bearer' prefix
      const decodedToken = jwt.verify(token, 'test1234'); // Verify and decode the token
      const username = decodedToken.username;
  
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove the classId from user's bookedClasses array
      const { classId } = req.params;
      const ObjectId = require('mongoose').Types.ObjectId;

      // Convert classId to ObjectId
      const classObjectId = new ObjectId(classId);
      user.bookedClasses = user.bookedClasses.filter(id => !id.equals(classObjectId));
      await user.save();
  
      res.status(200).json({ message: 'Class removed successfully', bookedClasses: user.bookedClasses });
    } catch (error) {
      console.error('Error removing class:', error);
      res.status(500).json({ message: 'Error removing class' });
    }
  });

module.exports = router;