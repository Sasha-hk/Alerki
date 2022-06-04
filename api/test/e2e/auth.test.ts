import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import usernameBlockList from '@Config/username-block-list';
import { AppModule } from '../../src/app.module';

const user = {
  username: 'james',
  email: 'james@gmail.com',
  role: 'client',
  password: '123456',
};

describe('Auth testing', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const application = await moduleFixture.createNestApplication().init();
    app = application.getHttpServer();
  });

  describe('/auth/register (POST)', () => {
    it('should register user(client)', async () => {
      await request(app)
        .post('/auth/register')
        .send(user)
        .expect(200);
    });

    it('should register user(master)', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          username: 'auth1',
          email: 'auth1@gmail.com',
          role: 'client',
          password: '123456',
        })
        .expect(200);
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
          .send({ ...user, username })
          .expect(400);
      }
    });
  });
});
