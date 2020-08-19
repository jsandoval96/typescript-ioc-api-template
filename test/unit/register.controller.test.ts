import 'reflect-metadata';
import { userMock } from '../mocks/user.mock';
import { RegisterController } from '../../src/controllers/auth/register.controller';
import { results } from 'inversify-express-utils';

describe('Register Controller', () => {
  const userRepositoryMock = jest.fn();
  const notificationMock = jest.fn();

  it('[Register User] Should return a user registerd with status code 201', async () => {
    userRepositoryMock.mockReturnValue({
      findByEmail: () => undefined,
      create: () => userMock
    });
    notificationMock.mockReturnValue({
      send: () => undefined
    });

    const controller = new RegisterController(userRepositoryMock(), notificationMock());
    const res = await controller.register(userMock);

    expect(res).toBeInstanceOf(results.JsonResult);
    expect(res.statusCode).toBe(201);
    expect(res.json).toEqual(userMock);
  });

  it('[Register User] Should return a email already exist error with status code 401', async () => {
    userRepositoryMock.mockReturnValue({
      findByEmail: () => userMock
    });

    const controller = new RegisterController(userRepositoryMock(), notificationMock());
    const res = await controller.register(userMock);

    expect(res).toBeInstanceOf(results.JsonResult);
    expect(res.statusCode).toBe(401);
    expect(res.json.message).toBeDefined();
  });
});
