import request from 'supertest';
import axios from 'axios';
import App from '../../app';
import getCookies from '../../utils/get-cookies';

const APP = new App();
const app = APP.getApp();

const user = {
  username: 'user_test',
  email: 'user_test@gamil.com',
  profileType: 'master',
  password: 'user-test',
  id: 0,
  firstName: 'firstName_',
  lastName: 'lastName_',
  phoneNumber: '+380000000000',
  pictureID: 0,
  clientID: 0,
  masterID: 0,
  banned: false,
  accessToken: '',
  refreshToken: '',
};

describe('Services functionality', () => {
  it('should register new user', async () => {
    const createUserRequest = await request(app)
      .post('/auth/register')
      .send(user);

    expect(createUserRequest.status).toEqual(200);

    const cookies = getCookies(createUserRequest);

    expect(cookies?.accessToken).toBeTruthy();
    expect(cookies?.refreshToken).toBeTruthy();

    user.accessToken = cookies.accessToken;
    user.refreshToken = cookies.refreshToken;
  });

  describe('test become master / client endpoints', () => {
    describe('become client', () => {
      it('should make profile type as client', async () => {
        const r = await request(app)
          .patch('/user/become/client')
          .set('Cookie', [
            'accessToken=' + user.accessToken,
            'refreshToken=' + user.refreshToken,
          ]);

        expect(r.status).toEqual(200);
        expect(r.body.profileType).toEqual('client');
        expect(r.body.clientID).toBeTruthy();
      });
    });

    describe('become master', () => {
      it('should make profile type as master', async () => {
        const r = await request(app)
          .patch('/user/become/master')
          .set('Cookie', [
            'accessToken=' + user.accessToken,
            'refreshToken=' + user.refreshToken,
          ]);

        expect(r.status).toEqual(200);
        expect(r.body.profileType).toEqual('master');
        expect(r.body.masterID).toBeTruthy();
      });
    });
  });

  describe('test update `user` endpoints', () => {
    describe('test for client', () => {
      it('should set first / last name and phone number', async () => {
        const r = await request(app)
          .patch('/user')
          .set('Cookie', [
            'accessToken=' + user.accessToken,
            'refreshToken=' + user.refreshToken,
          ])
          .send(user);

        expect(r.status).toEqual(200);
        expect(r.body.firstName).toEqual(user.firstName);
        expect(r.body.lastName).toEqual(user.lastName);
        expect(r.body.phoneNumber).toEqual(user.phoneNumber);
      });

      it('should not update only phone number', async () => {
        user.phoneNumber = '+380000000111';

        const r = await request(app)
          .patch('/user')
          .set('Cookie', [
            'accessToken=' + user.accessToken,
            'refreshToken=' + user.refreshToken,
          ])
          .send({
            phoneNumber: user.phoneNumber,
          });

        expect(r.status).toEqual(200);
        expect(r.body.firstName).toEqual(user.firstName);
        expect(r.body.lastName).toEqual(user.lastName);
        expect(r.body.phoneNumber).toEqual(user.phoneNumber);
      });
    });

    describe('test update user with picture', () => {
      it('should not update user picture', async () => {
        const pictureUrl = 'https://petryk.me/_next/static/media/road-image.41cd4142.jpg';

        const picture = await axios({
          url: pictureUrl,
          method: 'get',
          responseType: 'arraybuffer',
        });

        const r = await request(app)
          .patch('/user')
          .set('Cookie', [
            'accessToken=' + user.accessToken,
            'refreshToken=' + user.refreshToken,
          ])
          .type('form')
          .attach('picture', Buffer.from(picture.data, 'base64'), 'picture.jpg');

        expect(r.status).toEqual(200);
        expect(r.body.firstName).toEqual(user.firstName);
        expect(r.body.lastName).toEqual(user.lastName);
        expect(r.body.phoneNumber).toEqual(user.phoneNumber);
        expect(r.body.pictureID).toBeTruthy();
      });
    });
  });

  describe('test update master data', () => {
    it('should update master biography', async () => {
      const biography = 'I am a good programmer';
      const r = await request(app)
        .patch('/user/master')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
          'refreshToken=' + user.refreshToken,
        ])
        .send({
          biography,
        });

      expect(r.status).toEqual(200);
      expect(r.body.master.biography).toEqual(biography);
    });
  });

  describe('test user endpoint', () => {
    it('should return user data', async () => {
      const r = await request(app)
        .get('/user')
        .set('Cookie', [
          'accessToken=' + user.accessToken,
          'refreshToken=' + user.refreshToken,
        ]);

      expect(r.status).toEqual(200);
      expect(r.body).toBeTruthy();
    });
  });
});
