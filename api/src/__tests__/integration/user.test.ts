import request from 'supertest';
import App from '../../app';
import getCookies from '../../utils/get-cookies';

const APP = new App();
const app = APP.getApp();

const user = {
  username: 'user_test',
  email: 'user_test@gamil.com',
  profileType: 'client',
  password: 'user-test',
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
    describe('become master', () => {
      it('should make profile type as master', async () => {
        const r = await request(app)
          .patch('/user/become/master')
          .set('Cookie', [
            'accessToken=' + user.accessToken,
            'refreshToken=' + user.refreshToken,
          ]);

        expect(r.status).toEqual(200);
      });

      it('should get profile type as master', async () => {
        const checkProfileType = await request(app)
          .get('/auth/user')
          .set('Cookie', [
            'accessToken=' + user.accessToken,
            'refreshToken=' + user.refreshToken,
          ]);

        expect(checkProfileType.status).toEqual(200);
        expect(checkProfileType.body.profileType).toEqual('master');
      });
    });

    describe('become client', () => {
      it('should make profile type as client', async () => {
        const r = await request(app)
          .patch('/user/become/client')
          .set('Cookie', [
            'accessToken=' + user.accessToken,
            'refreshToken=' + user.refreshToken,
          ]);

        expect(r.status).toEqual(200);
      });

      it('should get profile type as client', async () => {
        const checkProfileType = await request(app)
          .get('/auth/user')
          .set('Cookie', [
            'accessToken=' + user.accessToken,
            'refreshToken=' + user.refreshToken,
          ]);

        expect(checkProfileType.status).toEqual(200);
        expect(checkProfileType.body.profileType).toEqual('client');
      });
    });
  });
});
