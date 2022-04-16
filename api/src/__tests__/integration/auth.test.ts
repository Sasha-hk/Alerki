import jwt from 'jsonwebtoken';
import request from 'supertest';
import App from '../../app';
import getCookies from '../../utils/get-cookies';
import { IDevicesDto } from '../../utils/dto/devices.dto';

const APP = new App();
const app = APP.getApp();

const user = {
  username: 'user',
  email: 'user@user.com',
  profileType: 'client',
  password: 'user',
  id: 0,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  pictureID: 0,
  clientID: 0,
  masterID: 0,
  banned: false,
  accessToken: '',
  refreshToken: '',
};

let devices: IDevicesDto[] = [];

describe('Authentication functionality', () => {
  describe('test register endpoint', () => {
    it('should register user with correct data', async () => {
      const r = await request(app)
        .post('/auth/register')
        .send(user);

      expect(r.status).toEqual(200);

      const cookies = getCookies(r);

      expect(cookies?.accessToken).toBeTruthy();
      expect(cookies?.refreshToken).toBeTruthy();

      user.accessToken = cookies.accessToken;
      user.refreshToken = cookies.refreshToken;
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

  describe('test get devices endpoint', () => {
    it('should return devices array', async () => {
      const r = await request(app)
        .get('/auth/devices')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
          'refreshToken=' + user.refreshToken,
        ]);

      expect(r.statusCode).toEqual(200);
      expect(r.body.length !== 0).toEqual(true);
      devices = r.body;
    });
  });

  describe('test delete device endpoint', () => {
    it('should return 400 error', async () => {
      const r = await request(app)
        .delete('/auth/device/bad-token')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
          'refreshToken=' + user.refreshToken,
        ]);

      expect(r.statusCode).toEqual(400);
    });

    it('should return 404 error', async () => {
      const r = await request(app)
        .delete('/auth/device/00000000-0000-0000-0000-000000000000')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
          'refreshToken=' + user.refreshToken,
        ]);

      expect(r.statusCode).toEqual(404);
    });

    it('should delete device', async () => {
      const r = await request(app)
        .delete('/auth/device/' + devices[0].id)
        .set('Cookie', [
          'accessToken=' + user.accessToken,
          'refreshToken=' + user.refreshToken,
        ]);

      expect(r.statusCode).toEqual(200);
    });
  });

  describe('test log-in endpoints', () => {
    it('should log-in the user', async () => {
      const r = await request(app)
        .post('/auth/log-in')
        .send(user);

      expect(r.statusCode).toEqual(200);

      const cookies = getCookies(r);

      expect(cookies?.accessToken).toBeTruthy();
      expect(cookies?.refreshToken).toBeTruthy();

      user.accessToken = cookies.accessToken;
      user.refreshToken = cookies.refreshToken;
    });

    it('should not log-in user with bad password', async () => {
      const r = await request(app)
        .post('/auth/log-in')
        .send({
          ...user,
          password: 'bad password',
        });

      expect(r.statusCode).toEqual(400);
    });

    it('should not log-in user with bad email', async () => {
      const r = await request(app)
        .post('/auth/log-in')
        .send({
          ...user,
          email: 'bad email',
        });

      expect(r.statusCode).toEqual(400);
    });

    it('should not log-in user with bad username', async () => {
      const r = await request(app)
        .post('/auth/log-in')
        .send({
          ...user,
          username: 'bad username',
          email: null,
        });

      expect(r.statusCode).toEqual(400);
    });
  });

  describe('test log-out endpoint', () => {
    it('should not log-out user without tokens', async () => {
      const r = await request(app)
        .get('/auth/log-out');

      expect(r.statusCode).toEqual(401);
    });

    it('should log-out user without tokens', async () => {
      const r = await request(app)
        .get('/auth/log-out')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
          'refreshToken=' + user.refreshToken,
        ]);

      expect(r.statusCode).toEqual(200);

      const cookies = getCookies(r);

      expect(cookies.refreshToken).toEqual('');
      expect(cookies.accessToken).toEqual('');
    });
  });

  describe('test refresh endpoint', () => {
    it('should refresh tokens', async () => {
      const r = await request(app)
        .get('/auth/refresh')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
          'refreshToken=' + user.refreshToken,
        ]);

      expect(r.statusCode).toEqual(200);

      const cookies = getCookies(r);

      expect(cookies.refreshToken).toBeTruthy();
      expect(cookies.accessToken).toBeTruthy();
    });

    it('should not refresh token', async () => {
      const refreshToken = jwt.sign(
        {
          id: '1234556',
          username: user.username,
          email: user.email,
        },
        'secret',
      );

      const r = await request(app)
        .get('/auth/refresh')
        .set('Cookie', [
          refreshToken,
        ]);

      expect(r.statusCode).toEqual(401);
    });
  });
});
