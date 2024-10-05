
const setupTestDB = require('./setupTestDB');
setupTestDB(); 

const request = require('supertest');
const app = require('../server');

describe('POST /signup', () => {


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


  