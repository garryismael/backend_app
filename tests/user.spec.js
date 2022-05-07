const supertest = require('supertest');
const httpStatus = require('http-status');
const app = require('../app');

describe('Test User', () => {
  let token;
  const URL = '/api/users';

  beforeAll(async () => {
    const response = await supertest(app).post('/api/auth/login').send({
      username: 'garry',
      password: 'motdepasse',
    });
    token = response.body['token'];
  });

  it('List all users', async () => {
    const response = await supertest(app)
      .get(URL)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(httpStatus.OK);
  });

  it('List connected User', async () => {
    const response = await supertest(app)
      .get(`${URL}/me`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(httpStatus.OK);
  });
});

