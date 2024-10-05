
const setupTestDB = require('./setupTestDB');
setupTestDB();

const request = require('supertest');
const app = require('../server');

describe('POST /login', () => {
  it('should log in an existing user and return a token', async () => {
   
    await request(app)
      .post('/signup')
      .send({
        email: 'test@example.com',
        password: 'Password123!',
      });

    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'Password123!',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });

  it('should return an error for invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'wrong@example.com',
        password: 'Ca1enda$',
      })
      .expect(401);

    expect(response.body).toHaveProperty('messageError');
  });
});

