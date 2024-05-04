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

describe('POST /api/classes', () => {
  afterAll(async () => {
    await Class.deleteMany({});
  });

  test('should allow admin to add a new class to the list', async () => {
    const newClass = {
      title: 'Admin Added Class',
      description: 'Admin can add this class',
      instructor: 'Admin Instructor',
      schedule: '2024-05-21 15:00 - 2024-05-21 16:00'
    };

    const response = await request(app)
      .post('/api/classes')
      .set('Authorization', `test1234`)
      .send(newClass)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body.title).toBe(newClass.title);
    expect(response.body.description).toBe(newClass.description);
    expect(response.body.instructor).toBe(newClass.instructor);
    expect(response.body.schedule).toBe(newClass.schedule);

    const createdClass = await Class.findOne({ title: newClass.title });
    expect(createdClass).not.toBeNull();
  });
});
