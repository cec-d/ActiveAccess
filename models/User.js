const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;