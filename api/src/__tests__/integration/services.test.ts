import request from 'supertest';
import App from '../../app';
import serviceService from '../../services/service.service';

const APP = new App();
const app = APP.getApp();

const serviceName = 'haircut';

describe('Services functionality', () => {
  describe('test get services endpoint', () => {
    it('should return 200 status with services list', async () => {
      await serviceService.createOrGet({ name: serviceName });

      const r = await request(app)
        .get('/services/')
        .query({ name: serviceName });

      expect(r.body[0].name).toEqual(serviceName);
    });

    it('should return 404 error', async () => {
      const r = await request(app)
        .get('/services/')
        .query({ name: 'not exists service name' });

      expect(r.statusCode).toEqual(404);
    });
  });
});
