import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import usernameBlockList from '@Config/username-block-list';
import { AppModule } from '../../src/app.module';
import getCookies from '../utils/getCookies';
import * as cookieParser from 'cookie-parser';

const sleep = (ms: number) => {
  return new Promise((res: any) => {
    setTimeout(() => res(), ms);
  });
};

const user: { [key: string]: any } = {
  username: 'james',
  email: 'james@gmail.com',
  role: 'client',
  password: '123456',
};

const otherUser: { [key: string]: any } = {
  username: 'auth1',
  email: 'auth1@gmail.com',
  role: 'client',
  password: '123456',
};

const checkTokens = (res: any) => {
  const cookies = getCookies(res);
  expect(cookies.accessToken).toBeTruthy();
  expect(cookies.refreshToken).toBeTruthy();

  return cookies;
};

const logInUser = async (app: any, user: any) => {
  const res = await request(app)
    .post('/auth/log-in')
    .send(user)
    .expect(200);

  const cookies = getCookies(res.headers);

  return {
    res,
    cookies,
  };
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
        .send(otherUser)
        .expect(200);

      const cookies = checkTokens(res);
      otherUser.accessToken = cookies.accessToken;
      otherUser.refreshToken = cookies.refreshToken;
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
        })
        .expect(200);

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
        })
        .expect(200);

      checkTokens(res);
    });

    it('should log-in and update exists session', async () => {
      await request(app)
        .post('/auth/log-in')
        .send(user)
        .set({ 'user-agent': 'IPhone XR' })
        .expect(200);

      await request(app)
        .post('/auth/log-in')
        .send(user)
        .set({ 'user-agent': 'IPhone XR' })
        .expect(200);
    });

    it('should not log-in user', async () => {
      const res = await request(app)
        .post('/auth/log-in')
        .send({
          ...user,
          email: undefined,
          username: undefined,
        })
        .expect(400);
    });

    it('should not log-in user with bad password', async () => {
      const res = await request(app)
        .post('/auth/log-in')
        .send({
          ...user,
          password: '1234567',
        })
        .expect(400);
    });

    it('should generate different access and refresh keys', async () => {
      const first = await logInUser(app, user);
      await sleep(1000);
      const second = await logInUser(app, user);

      expect(first.cookies.accessToken === second.cookies.accessToken).toBe(false);
      expect(first.cookies.refreshToken === second.cookies.refreshToken).toBe(false);
    });
  });

  describe('/auth/log-out (GET)', () => {
    it('should log-out user by refresh token', async () => {
      await request(app)
        .get('/auth/log-out')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
          'refreshToken=' + user.refreshToken,
        ])
        .expect(200);
    });

    it('should log-out user by device name', async () => {
      await request(app)
        .get('/auth/log-out')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
        ])
        .set({ 'user-agent': 'IPhone XR' })
        .expect(200);
    });

    it('should forbid access with bad access token', async () => {
      await request(app)
        .get('/auth/log-out')
        .set('Cookie', [
          'accessToken=' + user.accessToken + 'c',
        ])
        .set({ 'user-agent': 'IPhone XR' })
        .expect(401);
    });

    it('should not delete session by user with \'undefined\' device name', async () => {
      await request(app)
        .get('/auth/log-out')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
        ])
        .expect(200);
    });

    it('should not log-out unauthenticated user', async () => {
      await request(app)
        .get('/auth/log-out')
        .expect(401);
    });
  });

  describe('/auth/sessions (GET)', () => {
    it('should return list of sessions', async () => {
      const logInData = await logInUser(app, user);

      user.accessToken = logInData.cookies.accessToken;

      const res = await request(app)
        .get('/auth/sessions')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
        ])
        .expect(200);

      expect(res.body).toBeTruthy();
    });

    it('should return 404 code', async () => {
      const res = await request(app)
        .get('/auth/sessions')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
        ])
        .expect(200);

      for (const session of res.body) {
        await request(app)
          .delete('/auth/sessions/' + session.id)
          .set('Cookie', 'accessToken=' + user.accessToken);
      }

      await request(app)
        .get('/auth/sessions')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
        ])
        .expect(404);
    });
  });

  describe('/auth/sessions/:id (DELETE)', () => {
    it('should delete all sessions', async () => {
      const countOfSessions = 10;

      for (let i = 0; i < countOfSessions; i++) {
        await logInUser(app, user);
      }

      const res = await request(app)
        .get('/auth/sessions')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
        ])
        .expect(200);

      expect(res.body).toBeTruthy();
      expect(res.body.length).toBe(10);

      for (const session of res.body) {
        await request(app)
          .delete('/auth/sessions/' + session.id)
          .set('Cookie', 'accessToken=' + user.accessToken);
      }

      const logInData = await logInUser(app, user);

      user.accessToken = logInData.cookies.accessToken;

      const checkSessions = await request(app)
        .get('/auth/sessions')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
        ])
        .expect(200);

      expect(checkSessions.body.length).toBe(1);
    });

    it('should forbid to delete session that not belongs to user', async () => {
      const checkSessions = await request(app)
        .get('/auth/sessions')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
        ])
        .expect(200);

      await request(app)
        .delete('/auth/sessions/' + checkSessions.body[0].id)
        .set('Cookie', [
          'accessToken=' + otherUser.accessToken,
        ])
        .expect(403);
    });
  });
});
