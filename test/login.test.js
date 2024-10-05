
const setupTestDB = require('./setupTestDB');
setupTestDB();

const request = require('supertest');
const app = require('../server');

describe('POST /login', () => {
  

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

