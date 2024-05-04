// tests/integration2.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Class = require('../models/Class');

const mongoUri = 'mongodb://localhost:27017';

beforeAll(async () => {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await User.deleteMany({});
  await Class.deleteMany({});
});

describe('Integration Testing - Admin removes a class', () => {
  let adminToken;
  let testClassId;

  beforeAll(async () => {
    // Create an admin user and get an auth token
    const adminUser = new User({ username: 'adminUser', password: 'adminPass', role: 'admin' });
    await adminUser.save();
    adminToken = 'test1234';

    // Add a test class to be deleted later
    const testClass = new Class({ title: 'Zumba Class', description: 'Zumba for fun', instructor: 'John Smith', schedule: '2024-05-22 12:00 - 2024-05-22 13:00' });
    await testClass.save();
    testClassId = testClass._id;
  });

  test('should allow an admin to remove a class from the list', async () => {
    const response = await request(app)
      .delete(`/api/classes/${testClassId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body.message).toBe('Class removed successfully');

    const deletedClass = await Class.findById(testClassId);
    expect(deletedClass).toBeNull();
  });
});
