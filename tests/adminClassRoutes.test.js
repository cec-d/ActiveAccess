// tests/classesRoutes.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Class = require('../models/Class');

const mongoUri = 'mongodb://localhost:27017/test-database';

beforeAll(async () => {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('DELETE /api/classes/:id', () => {
  let testClass;

  beforeAll(async () => {
    testClass = new Class({ title: 'Admin Class', description: 'Class for Admin', instructor: 'Admin', schedule: '2024-05-21 13:00 - 2024-05-21 14:00' });
    await testClass.save();
  });

  afterAll(async () => {
    await Class.deleteMany({});
  });

  test('should allow admin to remove a class from the list', async () => {
    const response = await request(app)
      .delete(`/api/classes/${testClass._id}`)
      .set('Authorization', `test1234`)
      .expect(200);

    expect(response.body.message).toBe('Class removed successfully');
    const deletedClass = await Class.findById(testClass._id);
    expect(deletedClass).toBeNull();
  });
});
