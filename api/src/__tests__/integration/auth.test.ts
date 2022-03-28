import request from 'supertest';
import App from '../../app';
import AuthError from '../../errors/auth.error';
import IError from '../../interfaces/error.interface';

const APP = new App();
const app = APP.getApp();

const user: object = {
  username: 'user',
  email: 'user@user.com',
  profileType: 'client',
  password: 'user',
};

async function wrapAuthError(
  actions: () => any,
  callback: (e: IError | any) => any,
) {
  try {
    await actions();

    throw Error('Expected to catch AuthError');
  } catch (e: IError | any) {
    callback(e);
  }
}

describe('Authentication functionality', () => {
  describe('test register endpoint', () => {
    it('should register user with correct data', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send(user);

      expect(res.status).toEqual(200);
    });

    it('should not register user without any data', async () => {
      const r = await request(app)
        .post('/auth/register')
        .send({});

      expect(r.statusCode).toEqual(400);
    });

    it('should return 400 code due to incorrect email', async () => {
      const r = await request(app)
        .post('/auth/register')
        .send({
          ...user,
          email: 'bad@email',
        });

      expect(r.statusCode).toEqual(400);
    });

    it('should not register user with the same data', async () => {
      const r = await request(app)
        .post('/auth/register')
        .send(user);

      expect(r.statusCode).toEqual(400);
    });
  });
});
