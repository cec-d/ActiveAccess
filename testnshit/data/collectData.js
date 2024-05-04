// collectData.js
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/User');
const Class = require('./models/Class');

// Connect to the database
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Function to collect user data
async function collectUserData() {
  const users = await User.find({});

  fs.writeFileSync('usersData.json', JSON.stringify(users, null, 2));
  console.log('User data collected in usersData.json');
}

// Function to collect class data
async function collectClassData() {
  const classes = await Class.find({});

  fs.writeFileSync('classesData.json', JSON.stringify(classes, null, 2));
  console.log('Class data collected in classesData.json');
}

// Function to collect all data
async function collectAllData() {
  await collectUserData();
  await collectClassData();

  mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

// Run the data collection
collectAllData().catch(console.error);
