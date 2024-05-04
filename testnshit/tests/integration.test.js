// tests/integration.test.js

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
});

describe('Integration Testing', () => {
  let authToken;
  let testClassId;

  beforeAll(async () => {
    // Create a test user and get a valid auth token
    const user = new User({ username: 'testUser', password: 'testPassword' });
    await user.save();
    
    // Replace with your authentication logic to get an auth token
    authToken = 'test1234';
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Class.deleteMany({});
  });

  test('should allow an admin to add a new class', async () => {
    const newClass = {
      title: 'Integration Class',
      description: 'Integration test class',
      instructor: 'Integration Instructor',
      schedule: '2024-05-22 10:00 - 2024-05-22 11:00'
    };

    const response = await request(app)
      .post('/api/classes')
      .set('Authorization', `Bearer ${authToken}`) 
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
      .set('Authorization', `Bearer ${authToken}`)
      .send({ classId: testClassId })
      .expect(200);

    expect(response.body.message).toBe('Class booked successfully');

    // Verify that the class is booked for the user
    const user = await User.findOne({ username: 'testUser' });
    expect(user.bookedClasses.includes(testClassId)).toBe(true);
  });
});
