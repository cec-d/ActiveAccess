const express = require('express');
const router = express.Router();
const Class = require('../models/Class'); // Adjust the path as necessary

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

module.exports = router;