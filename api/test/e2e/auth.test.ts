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
import { AuthService } from '@Module/auth/auth.service';
import { AuthController } from '@Module/auth/auth.controller';
import { AuthGuard } from '@Module/auth/auth.guard';
import { JwtTokensService } from '@Module/auth/jwt-tokens.service';
import { SessionService } from '@Module/auth/session.service';
import { UserService } from '@Module/user/user.service';
import sleep from '@Shared/util/sleep';

const prisma = new PrismaClient();

const clientUser = {
  email: 'authtest@gmail.com',
  username: 'authTest',
  password: '12345678',
  fingerprint: '103c090c2641a3976d2d4984bb659d69',
  tokens: {
    refreshToken: '',
    accessToken: '',
  },
};

describe('Auth testing', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const application = await module
      .createNestApplication()
      .use(cookieParser())
      .useGlobalPipes(new ValidationPipe({ transform: true }))
      .init();

    app = application.getHttpServer();

    // Clear database
    await prisma.user.deleteMany();
    await prisma.session.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('standard interaction', () => {
    let sessions: Array<Prisma.Session> = [];
    let users: Array<Prisma.User> = [];

    describe('register', () => {
      test('should register user', async () => {
        const r = await request(app)
          .post('/auth/register')
          .send(clientUser)
          .expect(200);

        const cookies = getCookies(r);
        clientUser.tokens.accessToken = r.body.accessToken;
        clientUser.tokens.refreshToken = cookies.refreshToken.value;

        users = await prisma.user.findMany();
        sessions = await prisma.session.findMany();
      });

      test('check created user', async () => {
        expect(users.length).toBe(1);
        expect(users[0].email).toBe(clientUser.email);
        expect(users[0].username).toBe(clientUser.username);
      });

      test('check created session', () => {
        expect(sessions.length).toBe(1);
        expect(sessions[0].userId).toBe(users[0].id);
        expect(sessions[0].fingerprint === clientUser.fingerprint).toBeTruthy();
      });
    });

    describe('log-in', () => {
      describe('with not exist fingerprint', () => {
        const tokens: Record<string, any> = {};

        test('should log-in user', async () => {
          const r = await request(app)
            .post('/auth/log-in')
            .send({
              ...clientUser,
              fingerprint: '1'.repeat(32),
            })
            .expect(200);

          const cookies = getCookies(r);
          tokens.accessToken = r.body.accessToken;
          tokens.refreshToken = cookies.refreshToken.value;
        });

        test('check sessions', async () => {
          const newSessions = await prisma.session.findMany();

          expect(newSessions.length).toBe(2);

          expect(newSessions.find(
            (item: Prisma.Session) => tokens.refreshToken === item.refreshToken,
          )).toBeTruthy();

          expect(newSessions.find(
            (item: Prisma.Session) => '1'.repeat(32) === item.fingerprint,
          )).toBeTruthy();

          sessions = newSessions;
        });

        test('check if fingerprints is different', () => {
          expect(sessions[0].fingerprint).not.toBe(sessions[1].fingerprint);
        });
      });

      describe('with exist fingerprint', () => {
        const tokens: Record<string, any> = {};

        test('should log-in user', async () => {
          const r = await request(app)
            .post('/auth/log-in')
            .send({
              ...clientUser,
            })
            .expect(200);

          const cookies = getCookies(r);
          tokens.accessToken = r.body.accessToken;
          tokens.refreshToken = cookies.refreshToken.value;

          clientUser.tokens.accessToken = r.body.accessToken;
          clientUser.tokens.refreshToken = cookies.refreshToken.value;
        });

        test('check sessions', async () => {
          const newSessions = await prisma.session.findMany();

          expect(newSessions.length).toBe(2);

          expect(newSessions.find(
            (item: Prisma.Session) => tokens.refreshToken === item.refreshToken,
          )).toBeTruthy();

          expect(newSessions.find(
            (item: Prisma.Session) => clientUser.fingerprint === item.fingerprint,
          )).toBeTruthy();
        });

        test('check if fingerprints is different', async () => {
          const sessions = await prisma.session.findMany();

          expect(sessions[0].fingerprint).not.toBe(sessions[1].fingerprint);
        });

        test('check if refresh tokens has been changed', async () => {
          const localSessions = await prisma.session.findMany();

          const sessionBeforeNewLogin = sessions.find(
            (item: Prisma.Session) => clientUser.fingerprint === item.fingerprint,
          );
        });
      });
    });

    describe('log-out', () => {
      test('should log-out user', async () => {
        console.log(`refreshToken=${clientUser.tokens.refreshToken}`);
        const r = await request(app)
          .get('/auth/log-out')
          .set('Cookie', [`refreshToken=${clientUser.tokens.refreshToken}`])
          // .expect(200);

        console.log(r.body, r.statusCode);

        expect(r.statusCode).toBe(200);
      });

      test('check sessions count', async () => {
        const localSessions = await prisma.session.findMany();

        expect(localSessions.length).toBe(1);
      });
    });

    describe('refresh', () => {
      test('should refresh token', async () => {
        await sleep(1);

        const r = await request(app)
          .get('/auth/refresh')
          .send({
            fingerprint: clientUser.fingerprint,
          })
          .set('Cookie', [`refreshToken=${clientUser.tokens.refreshToken}`])
          .set({ Authorization: 'Bearer ' + clientUser.tokens.accessToken })
          .expect(200);

        const cookies = getCookies(r);

        expect(clientUser.tokens.refreshToken).not.toBe(cookies.refreshToken.value);

        clientUser.tokens.accessToken = r.body.accessToken;
        clientUser.tokens.refreshToken = cookies.refreshToken.value;
      });

      test('check sessions', async () => {
        const localSessions = await prisma.session.findMany();

        expect(
          localSessions.find((item: Prisma.Session) => item.refreshToken === clientUser.tokens.refreshToken),
        ).toBeTruthy();
      });
    });
  });
});
