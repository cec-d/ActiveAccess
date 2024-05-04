// tests/bookings.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Class = require('../models/Class');

const mongoUri = 'mongodb://localhost:27017/test-database';

beforeAll(async () => {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('DELETE /api/bookings/:classId', () => {
  let testUser;

  beforeAll(async () => {
    testUser = new User({ username: 'testUser', bookedClasses: [] });
    await testUser.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Class.deleteMany({});
  });

  test('should remove a booked class from user\'s schedule', async () => {
    const testClass = new Class({ title: 'Test Class', description: 'Testing Class', instructor: 'Jane Doe', schedule: '2024-05-21 11:00 - 2024-05-21 12:00' });
    await testClass.save();

    testUser.bookedClasses.push(testClass._id);
    await testUser.save();

    const response = await request(app)
      .delete(`/api/bookings/${testClass._id}`)
      .set('Authorization', `test1234`)
      .expect(200);

    expect(response.body.message).toBe('Class removed successfully');
    const updatedUser = await User.findById(testUser._id);
    expect(updatedUser.bookedClasses.includes(testClass._id)).toBe(false);
  });
});
