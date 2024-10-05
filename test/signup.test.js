
const setupTestDB = require('./setupTestDB');
setupTestDB(); 

const request = require('supertest');
const app = require('../server');

describe('POST /signup', () => {
  it('should register a new user and return a token', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        email: 'test@example.com',
        password: 'Password123!',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });

  it('should return an error for missing fields', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        email: '',
        password: 'Password123!',
      })
      .expect(400);

    expect(response.body).toHaveProperty('messageError');
  });
});


  