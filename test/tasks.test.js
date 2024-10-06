
const setupTestDB = require('./setupTestDB');
setupTestDB();

const request = require('supertest');
const app = require('../server');
const { Task } = require('../config/model'); 

describe('GET /api/tasks', () => {
  it('should return a list of tasks', async () => {
   
    await Task.create({ title: 'Task 1', description: 'Description 1' });
    await Task.create({ title: 'Task 2', description: 'Description 2' });

    const response = await request(app)
      .get('/api/tasks')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});