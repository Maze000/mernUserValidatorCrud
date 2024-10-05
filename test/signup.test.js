// test/signup.test.js
const setupTestDB = require('./setupTestDB');
setupTestDB(); // Ejecuta la configuración de la base de datos

const request = require('supertest');
const app = require('../server'); // Ajusta la ruta según la ubicación de tu servidor

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

    expect(response.body).toHaveProperty('messageError', 'Email is required.');
  });
});


  