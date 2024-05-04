// tests/integration1.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Class = require('../models/Class');

const mongoUri = 'mongodb://localhost:27017/integration-test-db';

beforeAll(async () => {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await User.deleteMany({});
  await Class.deleteMany({});
});

describe('Integration Testing - Admin adds and user books a class', () => {
  let adminToken;
  let userToken;
  let testClassId;

  beforeAll(async () => {
    // Create an admin user and get an auth token
    const adminUser = new User({ username: 'adminUser', password: 'adminPass', role: 'admin' });
    await adminUser.save();
    adminToken = 'test1234';

    // Create a regular user and get an auth token
    const regularUser = new User({ username: 'regularUser', password: 'userPass' });
    await regularUser.save();
    userToken = 'test1234';
  });

  test('should allow an admin to add a new class', async () => {
    const newClass = {
      title: 'Yoga Class',
      description: 'Yoga for beginners',
      instructor: 'Jane Doe',
      schedule: '2024-05-22 10:00 - 2024-05-22 11:00'
    };

    const response = await request(app)
      .post('/api/classes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newClass)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body.title).toBe(newClass.title);
    expect(response.body.description).toBe(newClass.description);

    testClassId = response.body._id;
  });

  test('should allow a user to book the added class', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ classId: testClassId })
      .expect(200);

    expect(response.body.message).toBe('Class booked successfully');

    const user = await User.findOne({ username: 'regularUser' });
    expect(user.bookedClasses.includes(testClassId)).toBe(true);
  });
});
