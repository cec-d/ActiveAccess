const mongoose = require('mongoose');

// Define the schema for the Class model
const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  schedule: { type: String, required: true },
  // You can add more fields as needed
});

// Create a Class model based on the schema
const Class = mongoose.model('Class', classSchema);

module.exports = Class;