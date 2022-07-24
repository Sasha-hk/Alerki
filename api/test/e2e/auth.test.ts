/* eslint-disable max-nested-callbacks */
/* eslint-disable no-await-in-loop */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import Prisma, { PrismaClient } from '@prisma/client';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';

import { UsernameBlockList } from '@Config/api/block-list';
import { usernamePattern, userConfig } from '@Config/api/params.config';
import { AppModule } from '@Src/app.module';
import getCookies from '@Test/utils/getCookies';
import { asciiCharacters } from '@Test/data';

const prisma = new PrismaClient();

const helpUser = {
  email: 'auth_email@gmail.com',
  username: 'auth_username',
  password: 'auth_password',
  fingerprint: '103c090c2641a3976d2d4984bb659d69',
};

const clientUser: { [key: string]: any } = {
  email: 'auth_user@gmail.com',
  username: 'auth_user',
  password: 'password',
  fingerprint: '1d3c090c2641a3976d2d4984bb659d69',
  tokens: {
    accessToken: {},
    refreshToken: {},
  },
};

let clientUserPrism: Prisma.User;
let clientUserSessionPrism: Prisma.Session;
let sessions: Array<Prisma.Session>;

describe('Auth testing', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const application = await moduleFixture
      .createNestApplication()
      .use(cookieParser())
      .useGlobalPipes(new ValidationPipe({ transform: true }))
      .init();

    app = application.getHttpServer();
  });

  describe('register', () => {
    describe('should register user', () => {
      test('with correct data', async () => {
        const r = await request(app)
          .post('/auth/register')
          .send(clientUser)
          .expect(200);

        const cookies = getCookies(r);

        clientUser.tokens.refreshToken = cookies.refreshToken;
        clientUser.tokens.accessToken.value = r.body.accessToken;

        expect(cookies.refreshToken.value).toBeTruthy();
        expect(cookies.refreshToken.HttpOnly).toBe(true);
        expect(cookies.refreshToken.Secure).toBe(true);
        expect(cookies.refreshToken.SameSite).toBe('Strict');
        expect(r.body.accessToken).toBeTruthy();
      });

      test('check user and session', async () => {
        const users = await prisma.user.findMany();

        clientUserPrism = users[0];

        expect(users.length).toBe(1);
        expect(users[0].username).toBe(clientUser.username);
        expect(users[0].email).toBe(clientUser.email);
        expect(users[0].password).toBeTruthy();

        const sessions = await prisma.session.findMany();

        clientUserSessionPrism = sessions[0];

        expect(sessions.length).toBe(1);
        expect(sessions[0].userId).toBe(clientUserPrism.id);
        expect(sessions[0].fingerprint).toBe(clientUser.fingerprint);
      });
    });

    describe('should prohibit registration', () => {
      test('with too short or long fingerprint', async () => {
        await request(app)
          .post('/auth/register')
          .send({
            ...clientUser,
            fingerprint: 'o',
          })
          .expect(400);

        await request(app)
          .post('/auth/register')
          .send({
            ...clientUser,
            fingerprint: 'o'.repeat(33),
          })
          .expect(400);
      });

      test('with an empty or partial body', async () => {
        await request(app)
          .post('/auth/register')
          .send({})
          .expect(400);

        await request(app)
          .post('/auth/register')
          .send({ username: 'new_username' })
          .expect(400);

        await request(app)
          .post('/auth/register')
          .send({ email: 'test@gmail.com' })
          .expect(400);

        await request(app)
          .post('/auth/register')
          .send({ password: '123456' })
          .expect(400);
      });

      describe('with invalid email', () => {
        test('with exist email', async () => {
          await request(app)
            .post('/auth/register')
            .send({
              ...clientUser,
              username: 'usernameNew',
            })
            .expect(400);
        });

        test('not matches pattern', async () => {
          await request(app)
            .post('/auth/register')
            .send({
              ...helpUser,
              email: 'bad',
            })
            .expect(400);

          const r = await request(app)
            .post('/auth/register')
            .send({
              ...helpUser,
              email: 'b@b.b',
            })
            .expect(400);
        });
      });

      describe('with invalid username', () => {
        test('already exists', async () => {
          await request(app)
            .post('/auth/register')
            .send({
              ...clientUser,
              email: 'usernameD9A@gmail.com',
            })
            .expect(400);
        });

        test('length', async () => {
          // Min length
          for (let i = 0; i < 3; i++) {
            await request(app)
              .post('/auth/register')
              .send({
                ...helpUser,
                username: 'a'.repeat(i),
              })
              .expect(400);
          }

          // Max length
          await request(app)
            .post('/auth/register')
            .send({
              ...helpUser,
              username: 'a'.repeat(userConfig.username.maxLength + 1),
            })
            .expect(400);
        });

        test('characters', async () => {
          for (const character of asciiCharacters) {
            if (!character.match(usernamePattern)) {
              await request(app)
                .post('/auth/register')
                .send({
                  ...helpUser,
                  username: character.repeat(userConfig.username.minLength),
                })
                .expect(400);
            }
          }
        });

        test('blocklist', async () => {
          for (const username of UsernameBlockList) {
            await request(app)
              .post('/auth/register')
              .send({
                ...helpUser,
                email: 'newnotexistsemail@gmail.com',
                username,
              })
              .expect(400);
          }
        });

        test('password', async () => {
          for (let i = 0; i < userConfig.password.minLength; i++) {
            await request(app)
              .post('/auth/register')
              .send({
                ...helpUser,
                password: 'x'.repeat(i),
              })
              .expect(400);
          }

          await request(app)
            .post('/auth/register')
            .send({
              ...helpUser,
              password: 'x'.repeat(userConfig.password.maxLength + 1),
            })
            .expect(400);
        });
      });
    });
  });

  describe('log-in', () => {
    describe('should login user', () => {
      test('with correct password', async () => {
        const r = await request(app)
          .post('/auth/log-in')
          .send({
            ...clientUser,
          })
          .expect(200);

        const cookies = getCookies(r);

        clientUser.tokens.refreshToken = cookies.refreshToken;
        clientUser.tokens.accessToken.value = r.body.accessToken;

        expect(cookies.refreshToken.value).toBeTruthy();
        expect(cookies.refreshToken.HttpOnly).toBe(true);
        expect(cookies.refreshToken.Secure).toBe(true);
        expect(cookies.refreshToken.SameSite).toBe('Strict');
        expect(r.body.accessToken).toBeTruthy();
      });

      test('check user and sessions', async () => {
        const users = await prisma.user.findMany();

        clientUserPrism = users[0];

        expect(users.length).toBe(1);
        expect(users[0].username).toBe(clientUser.username);
        expect(users[0].email).toBe(clientUser.email);
        expect(users[0].password).toBeTruthy();

        sessions = await prisma.session.findMany();
      });

      test('amount of sessions == 1', async () => {
        expect(sessions.length).toBe(1);
      });

      test('session data have been changed', async () => {
        expect(sessions[0].userId).toBe(clientUserPrism.id);
        expect(sessions[0].fingerprint).toBe(clientUser.fingerprint);
      });

      test('refresh token have been changed', async () => {
        expect(clientUserSessionPrism.refreshToken !== sessions[0].refreshToken).toBe(true);
      });
    });

    describe('should prohibit login', () => {
      test('with not exists email', async () => {
        const data = { ...clientUser };
        delete data.username;

        await request(app)
          .post('/auth/log-in')
          .send({
            ...data,
            email: 'notexistsemail@gmail.com',
          })
          .expect(404);
      });

      test('with not exists username', async () => {
        const data = { ...clientUser };
        delete data.email;

        await request(app)
          .post('/auth/log-in')
          .send({
            fingerprint: clientUser.fingerprint,
            username: 'notExistsUsername',
            password: clientUser.password,
          })
          .expect(404);
      });

      test('without email and username', async () => {
        const data = { ...clientUser };
        delete data.email;
        delete data.username;

        await request(app)
          .post('/auth/log-in')
          .send({
            ...data,
          })
          .expect(400);
      });

      test('without invalid password', async () => {
        await request(app)
          .post('/auth/log-in')
          .send({
            ...clientUser,
            password: 'invalid-password',
          })
          .expect(400);
      });
    });

    describe('log-in with different fingerprint', () => {
      test('login', async () => {
        await request(app)
          .post('/auth/log-in')
          .send({
            ...clientUser,
            fingerprint: '103c090c2641a3976d2d4984bb659d61',
          })
          .expect(200);
      });

      test('check sessions', async () => {
        const newSessions = await prisma.session.findMany();

        expect(newSessions.length).toBe(2);
        expect(newSessions[0].fingerprint).not.toBe(newSessions[1].fingerprint);

        sessions = newSessions;
      });
    });
  });

  describe('log-out', () => {
    describe('should log-out user', () => {
      test('with correct refresh token', async () => {
        await request(app)
          .get('/auth/log-out')
          .set('Cookie', [`refreshToken=${clientUser.tokens.refreshToken.value}`])
          .expect(200);
      });

      test('check if session was deleted', async () => {
        const newSessions = await prisma.session.findMany();

        for (const s of newSessions) {
          if (s === clientUser.tokens.refreshToken.value) {
            throw new Error('Session should be deleted');
          }
        }
      });
    });

    describe('should not log-out user', () => {
      test('with invalid refresh token', async () => {
        await request(app)
          .get('/auth/log-out')
          .set('Cookie', [`refreshToken=${clientUser.tokens.refreshToken.value + 'D'}`])
          .expect(401);
      });

      test('without refresh token', async () => {
        await request(app)
          .get('/auth/log-out')
          .expect(401);
      });
    });
  });

  describe('sessions', () => {
    test('get sessions', async () => {
      // Log-in user
      const r = await request(app)
        .post('/auth/log-in')
        .send({
          ...clientUser,
          fingerprint: '103c090c2641a3976d2d4984bb659d6D',
        })
        .expect(200);

      const cookies = getCookies(r);

      clientUser.tokens.refreshToken = cookies.refreshToken;
      clientUser.tokens.accessToken.value = r.body.accessToken;

      const r1 = await request(app)
        .get('/auth/session')
        .set({ Authorization: 'Bearer ' + r.body.accessToken })
        .expect(200);

      expect(r1.body.length).not.toBe(1);

      const r2 = await request(app)
        .get('/auth/session')
        .set({ Authorization: 'Bearer ' + r.body.accessToken })
        .query({ page: 0, limit: 1 })
        .expect(200);

      expect(r2.body.length).toBe(1);
    });

    test('delete session', () => {

    });
  });
});
