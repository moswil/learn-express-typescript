import request from 'supertest';
import UserController from '../user.controller';
import App from '../../app';

describe('GET /users', () => {
  it('should return test user', () => {
    const userController = new UserController();
    const app = new App([userController]);

    return request(app.getServer())
      .get(`/api/v1${userController.path}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });
});
