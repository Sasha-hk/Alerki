/* eslint-disable max-nested-callbacks */
/* eslint-disable no-await-in-loop */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';

import { UsernameBlockList } from '@Config/api/block-list';
import { usernamePattern, userConfig } from '@Config/api/params.config';
import { AppModule } from '@Src/app.module';
import getCookies from '@Test/utils/getCookies';
import sleep from '@Test/utils/sleep';
import { asciiCharacters } from '@Test/data';

const prisma = new PrismaClient();

const helpUser = {
  email: 'auth_email@gmail.com',
  username: 'auth_username',
  password: 'auth_password',
};

const clientUser = {
  email: 'auth_user@gmail.com',
  username: 'auth_user',
  password: 'password',
};

describe('Auth testing', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const application = await moduleFixture
      .createNestApplication()
      .use(cookieParser())
      .init();

    app = application.getHttpServer();
  });

  describe('register', () => {
    describe('should prohibit registration with invalid', () => {
      test('email', async () => {
        await request(app)
          .post('/auth/register')
          .send({
            ...helpUser,
            email: 'bad',
          })
          .expect(400);

        await request(app)
          .post('/auth/register')
          .send({
            ...helpUser,
            email: 'b@b.b',
          })
          .expect(400);
      });

      describe('username', () => {
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
            request(app)
              .post('/auth/register')
              .send({
                ...helpUser,
                username,
              })
              .expect(400);
          }
        });
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

    describe('should register user', () => {
      test('with correct data', async () => {
        await request(app)
          .post('/auth/register')
          .send(clientUser)
          .expect(200);
      });
    });

    describe('should prohibit registration', () => {
      test('with exists email', async () => {
        await request(app)
          .post('/auth/register')
          .send({
            ...clientUser,
            username: 'usernameD9(A',
          })
          .expect(400);
      });

      test('with exists username', async () => {
        await request(app)
          .post('/auth/register')
          .send({
            ...clientUser,
            email: 'usernameD9(A@gmail.com',
          })
          .expect(400);
      });

      test('with an empty body', async () => {
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
    });

    test('check created user', async () => {
      const users = await prisma.user.findMany();

      expect(users.length).toBe(1);
      expect(users[0].username).toBe(clientUser.username);
      expect(users[0].email).toBe(clientUser.email);
      expect(users[0].password).toBeTruthy();
    });
  });

  describe('login', () => {

  });
});
