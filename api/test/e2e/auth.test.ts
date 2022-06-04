import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import usernameBlockList from '@Config/username-block-list';
import { AppModule } from '../../src/app.module';
import getCookies from '../utils/getCookies';
import * as cookieParser from 'cookie-parser';

const user: { [key: string]: any } = {
  username: 'james',
  email: 'james@gmail.com',
  role: 'client',
  password: '123456',
};

const checkTokens = (res: any) => {
  const cookies = getCookies(res);
  expect(cookies.accessToken).toBeTruthy();
  expect(cookies.refreshToken).toBeTruthy();

  return cookies;
};

describe('Auth testing', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const application = await moduleFixture.createNestApplication().use(cookieParser()).init();
    app = application.getHttpServer();
  });

  describe('/auth/register (POST)', () => {
    it('should register user(client)', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send(user);

      expect(res.statusCode).toBe(200);
      checkTokens(res);
    });

    it('should register user(master)', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'auth1',
          email: 'auth1@gmail.com',
          role: 'client',
          password: '123456',
        });

      expect(res.statusCode).toBe(200);
      checkTokens(res);
    });

    it('should not register user without role', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          username: 'guess',
          email: 'guess@gmail.com',
          password: '123456',
        })
        .expect(400);
    });

    it('should not register user without password', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          username: 'guess',
          role: 'client',
          email: 'guess@gmail.com',
        })
        .expect(400);
    });

    it('should not register user with incorrect body', async () => {
      await request(app)
        .post('/auth/register')
        .send({ username: false })
        .expect(400);
    });

    it('should not register user with exists email', async () => {
      await request(app)
        .post('/auth/register')
        .send({ ...user, username: 'not_exists' })
        .expect(400);

      await request(app)
        .post('/auth/register')
        .send({ ...user, email: user.email.toUpperCase() })
        .expect(400);
    });

    it('should not register user with exists username', async () => {
      await request(app)
        .post('/auth/register')
        .send({ ...user, email: 'not_exists@gmail.com' })
        .expect(400);

      await request(app)
        .post('/auth/register')
        .send({ ...user, username: user.username.toUpperCase() })
        .expect(400);
    });

    it('should prohibit registration with forbidden username', async () => {
      /* eslint-disable no-await-in-loop */
      for (const username of usernameBlockList) {
        await request(app)
          .post('/auth/register')
          .send({
            email: 'auth2@gamil.com',
            username,
            role: 'client',
            password: '123456',
          })
          .expect(400);
      }
    });
  });

  describe('/auth/log-in (POST)', () => {
    it('should log-in user with email', async () => {
      const res = await request(app)
        .post('/auth/log-in')
        .send({
          ...user,
          username: undefined,
        });

      expect(res.statusCode).toBe(200);
      const cookies = checkTokens(res);
      user.refreshToken = cookies.refreshToken;
      user.accessToken = cookies.accessToken;
    });

    it('should log-in user with username', async () => {
      const res = await request(app)
        .post('/auth/log-in')
        .send({
          ...user,
          email: undefined,
        });

      expect(res.statusCode).toBe(200);
      checkTokens(res);
    });

    it('should log-in user with username', async () => {
      const res = await request(app)
        .post('/auth/log-in')
        .send({
          ...user,
          email: undefined,
          username: undefined,
        });

      expect(res.statusCode).toBe(400);
    });

    it('should not log-in user with bad password', async () => {
      const res = await request(app)
        .post('/auth/log-in')
        .send({
          ...user,
          password: '1234567',
        });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('/auth/log-out (GET)', () => {
    it('should log-out user with bad password', async () => {
      const res = await request(app)
        .get('/auth/log-out')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
          'refreshToken=' + user.refreshToken,
        ]);

      expect(res.statusCode).toBe(200);
    });

    it('should log-out user with bad password', async () => {
      const res = await request(app)
        .get('/auth/log-out');

      expect(res.statusCode).toBe(401);
    });
  });
});
