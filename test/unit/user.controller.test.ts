import 'reflect-metadata';
import { userMock, usersMock } from '../mocks/user.mock';
import { UserController } from '../../src/controllers/user.controller';

describe('User Controller', () => {
  const userRepositoryMock: jest.Mock = jest.fn();

  it('Should return all users with status code 200', async () => {
    userRepositoryMock.mockReturnValue({
      all: () => usersMock
    });
    const controller = new UserController(userRepositoryMock());
    const res = await controller.all();

    expect(res.statusCode).toBe(200);
    expect(res.json).toEqual(usersMock);
  });

  it('Should return a user created with status code 201', async () => {
    userRepositoryMock.mockReturnValue({
      create: () => userMock
    });
    const controller = new UserController(userRepositoryMock());
    const res = await controller.create(userMock);

    expect(res.statusCode).toBe(201);
    expect(res.json).toEqual(userMock);
  });

  it('Should return a user finded with status code 200', async () => {
    userRepositoryMock.mockReturnValue({
      findById: () => userMock
    });
    const controller = new UserController(userRepositoryMock());
    const res = await controller.find(1);

    expect(res.statusCode).toBe(200);
    expect(res.json).toEqual(userMock);
  });

  it('Should return a user updated with status code 200', async () => {
    userRepositoryMock.mockReturnValue({
      findById: () => userMock,
      update: () => userMock
    });
    const controller = new UserController(userRepositoryMock());
    const res = await controller.update(1, userMock);

    expect(res.statusCode).toBe(200);
    expect(res.json).toEqual(userMock);
  });

  it('Should return a user removed with status code 200', async () => {
    userRepositoryMock.mockReturnValue({
      remove: () => userMock
    });
    const controller = new UserController(userRepositoryMock());
    const res = await controller.remove(1);

    expect(res.statusCode).toBe(200);
    expect(res.json).toEqual(userMock);
  });

  it('Should return a user restored with status code 200', async () => {
    userRepositoryMock.mockReturnValue({
      restore: () => userMock
    });
    const controller = new UserController(userRepositoryMock());
    const res = await controller.restore(1);

    expect(res.statusCode).toBe(200);
    expect(res.json).toEqual(userMock);
  });
});
