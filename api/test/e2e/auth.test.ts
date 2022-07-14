import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '../../src/app.module';
import getCookies from '../utils/getCookies';
import sleep from '../utils/sleep';

import userNameBlockList from '../../config/username-block-list';

describe('Auth testing', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const application = await moduleFixture.createNestApplication()
      .use(cookieParser)
      .init();
    app = application.getHttpServer();
  });

  test('1 + 2 = 3', () => {
    expect(1 + 2).toBe(3);
  });
});
