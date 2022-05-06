const supertest = require('supertest');
const httpStatus = require('http-status');
const app = require('../app');
const User = require('../src/models/user');
const db = require('../src/config/database');

jest.mock('../src/utils/email', () => {
  return {
    sendEmail: jest.fn(() => new Promise((resolve) => resolve())),
  };
});

describe('Test Authentication Route', () => {
  const data = {
    nom: 'tata',
    username: 'tata',
    email: 'tata@gmail.com',
    password: 'password',
  };

  // Delete All Table Data
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  it('Register A User', async () => {
    const response = await supertest(app).post('/api/auth/register').send(data);
    expect(response.status).toEqual(httpStatus.CREATED);
  });

  it('Register a user with username existed', async () => {
    await User.build(data).save();
    const response = await supertest(app).post('/api/auth/register').send(data);
    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it('Register a user with email already existed', async () => {
    await User.build(data).save();
    const response = await supertest(app).post('/api/auth/register').send(data);
    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });
});

