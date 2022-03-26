import request from 'supertest';
import App from '../../app';

const APP = new App();
const app = APP.getApp();

describe('Authentication functionality', () => {
  describe('test register endpoint', () => {
    it('should register user with correct data', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'Username',
          email: 'example@example.com',
          password: '1234',
          profileType: 'client',
        });

      expect(res.status).toEqual(200);
    });
  });
});
