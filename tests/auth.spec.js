const supertest = require('supertest');
const httpStatus = require('http-status');
const app = require('../index');

jest.mock('../src/utils/email', () => {
  return {
    sendEmail: jest.fn(() => new Promise((resolve) => resolve())),
  };
});

describe('Test Authentication Route', () => {
  const data = {
    nom: 'User',
    username: 'user',
    email: 'user@gmail.com',
    password: 'password',
  };

  it('Register A User', async () => {
    const response = await supertest(app).post('/api/auth/register').send(data);
    expect(response.status).toEqual(httpStatus.CREATED);
  });

  it('Register a user with username existed', async () => {
    const response = await supertest(app).post('/api/auth/register').send({
      nom: 'User',
      username: 'user',
      email: 'edit@gmail.com',
      password: 'password',
    });
    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it('Register a user with email already existed', async () => {
    const response = await supertest(app).post('/api/auth/register').send({
      nom: 'User',
      username: 'edit',
      email: 'user@gmail.com',
      password: 'password',
    });
    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it('Sign In a User', async () => {
    const response = await supertest(app).post('/api/auth/login').send({
      username: 'garry',
      password: 'motdepasse',
    });
    const token = response.body['token'];
    expect(token).toBeDefined();
    expect(response.body['user']['username']).toBe('garry');
  });
});

