const request = require('supertest');
const app = require('../server'); // Adjust the path to your main server file
const Class = require('../models/Class'); // Adjust the path to the Class model
require('dotenv').config(); // Load environment variables from .env

const mongoUri = 'mongodb://localhost:27017';

beforeAll(async () => {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
  });

describe('POST /api/classes', () => {
    // Cleanup after each test
    afterEach(async () => {
        await Class.deleteMany({});
    });

    test('should add a new fitness class to the schedule', async () => {
        const newClass = {
            title: 'Pilates for Beginners',
            description: 'A gentle introduction to Pilates exercises.',
            instructor: 'John Doe',
            schedule: '2024-05-20 10:00 - 2024-05-20 11:00'
        };

        const response = await request(app)
            .post('/api/classes') // Adjust the path if necessary
            .send(newClass)
            .expect('Content-Type', /json/)
            .expect(201); // Expect status 201 Created

        // Check if the response contains the correct data

        expect(response.body.title).toBe(newClass.title);
        expect(response.body.description).toBe(newClass.description);
        expect(response.body.instructor).toBe(newClass.instructor);
        expect(response.body.schedule).toBe(newClass.schedule);

        // Check if the class was added to the database
        const createdClass = await Class.findOne({ title: newClass.title });
        expect(createdClass).not.toBeNull();
        expect(createdClass.description).toBe(newClass.description);
    });
});