import 'reflect-metadata';
import { LoginController } from '../../src/controllers/auth/login.controller';
import { userMock } from '../mocks/user.mock';

describe('Login Controller', () => {
  const userRepositoryMock: jest.Mock = jest.fn();
  const tokenMock: jest.Mock = jest.fn();
  const responseMock: jest.Mock = jest.fn();

  it('[Login User] Should return a user logged with status code 200', async () => {
    const _userMock = { ...userMock, password: '12345' };
    tokenMock.mockReturnValue({
      create: () => 'eyJhbGciOiJIUzI1NiIs.eyJpZCI6MSwiaWF0Ijox.bLZMI_IW-FbDqsOYQKA'
    });
    userRepositoryMock.mockReturnValue({
      findByEmail: () => userMock
    });
    const controller = new LoginController(userRepositoryMock(), tokenMock());
    const res = await controller.login(_userMock);

    expect(res.statusCode).toBe(200);
    expect(res.json.token).toBe('eyJhbGciOiJIUzI1NiIs.eyJpZCI6MSwiaWF0Ijox.bLZMI_IW-FbDqsOYQKA');
  });

  it('[Login User] Should return an authentication error by email with status code 401', async () => {
    const _userMock = { ...userMock, password: '12345' };
    userRepositoryMock.mockReturnValue({
      findByEmail: () => undefined
    });
    const controller = new LoginController(userRepositoryMock(), tokenMock());
    const res = await controller.login(_userMock);

    expect(res.statusCode).toBe(401);
    expect(res.json.message).toBeDefined();
  });

  it('[Login User] Should return an authentication error by password with status code 401', async () => {
    const _userMock = { ...userMock, password: 'failed pass verification' };
    userRepositoryMock.mockReturnValue({
      findByEmail: () => userMock
    });
    const controller = new LoginController(userRepositoryMock(), tokenMock());
    const res = await controller.login(_userMock);

    expect(res.statusCode).toBe(401);
    expect(res.json.message).toBeDefined();
  });

  it('[Logged User] Should return an user logged in by token with status code 200', async () => {
    userRepositoryMock.mockReturnValue({
      findById: () => userMock
    });
    tokenMock.mockReturnValue({
      verify: () => 1
    });
    responseMock.mockReturnValue({
      locals: {
        auth: 1
      }
    });
    const controller = new LoginController(userRepositoryMock(), tokenMock());
    const res = await controller.user(responseMock());

    expect(res.statusCode).toBe(200);
    expect(res.json.user).toEqual(userMock);
  });

  it('[Logged User] Should return an invalid jwt error with status code 401', async () => {
    tokenMock.mockReturnValue({
      verify: () => undefined
    });
    responseMock.mockReturnValue({
      locals: {
        auth: null
      }
    });
    const controller = new LoginController(userRepositoryMock(), tokenMock());
    const res = await controller.user(responseMock());

    expect(res.statusCode).toBe(401);
    expect(res.json.message).toBeDefined();
  });
});
