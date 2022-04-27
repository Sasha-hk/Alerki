import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const user = {
  username: 'james',
  email: 'james@gmail.com',
  role: 'client',
  password: '123456',
};

describe('Auth testing', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/auth/register (POST)', () => {
    it('should register user with correct body', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(200);
    });

    it('should not register user with incorrect body', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ username: false })
        .expect(400);
    });

    it('should not register user with exists email', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ ...user, username: 'not_exists' })
        .expect(400);
    });

    it('should not register user with exists username', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ ...user, email: 'not_exists@gmail.com' })
        .expect(400);
    });
  });
});
