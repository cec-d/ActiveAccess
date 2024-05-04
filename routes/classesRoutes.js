const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Class = require('../models/Class'); // Adjust the path as necessary
const User = require('../models/User');

// GET /api/classes - Get all classes
router.get('/', async (req, res) => {
  try {
    // Query the database to retrieve all classes
    const classes = await Class.find();

    // Send the classes as JSON response
    res.json(classes);
  } catch (error) {
    // If an error occurs, send a 500 (Internal Server Error) response
    console.error('Error fetching classes:', error);
    res.status(500).json({ message: 'Error fetching classes' });
  }
});

router.get('/:classId', async (req, res) => {
  try {
    const classId = req.params.classId;
    // Find the class by ID in the database
    const classDetails = await Class.findById(classId);
    if (!classDetails) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(classDetails);
  } catch (error) {
    console.error('Error fetching class details:', error);
    res.status(500).json({ message: 'Error fetching class details' });
  }
});

// Add a class (Admin only)
router.post('/', async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error adding class:', error); // Log the actual error
    res.status(500).json({ message: 'Failed to add class', error });
  }
});

// Remove a class (Admin only)
router.delete('/:classId', async (req, res) => {
  const { classId } = req.params;
  const classObjectId = new ObjectId(classId);
  try {
    console.log(classObjectId);
    const classToDelete = await Class.findOne({ _id: classObjectId });

    if (!classToDelete) {
      return res.status(404).json({ message: 'No Class to Delete' });
    }

    const deletedClass = await Class.findByIdAndDelete(classObjectId);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    await User.updateMany(
      { bookedClasses: classObjectId }, // Find users who have booked the class
      { $pull: { bookedClasses: classObjectId } } // Remove the class from their bookedClasses
    );

    res.status(200).json({ message: 'Class removed successfully' });
  } catch (error) {
    console.error('Error removing class:', error);
    res.status(500).json({ message: 'Failed to remove class', error });
  }
});

module.exports = router;