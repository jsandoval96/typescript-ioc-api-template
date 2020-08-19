import 'reflect-metadata';
import httpMocks from 'node-mocks-http';
import { AuthMiddleware } from '../../src/middlewares/auth.middleware';

describe('Auth Middleware', () => {
  const tokenMock: jest.Mock = jest.fn();
  const nextMock: jest.Mock = jest.fn();

  it('It should pass the middleware correctly', async () => {
    tokenMock.mockReturnValue({
      verify: () => 1
    });
    const requestMock = httpMocks.createRequest({
      headers: {
        authorization: 'eyr4r$r4t45tk902k$/f4433t'
      }
    });
    const responseMock = httpMocks.createResponse();
    nextMock.mockReturnValue({
      next: () => true
    });

    const controller = new AuthMiddleware(tokenMock());
    controller.handler(requestMock, responseMock, nextMock());

    expect(nextMock.mock.calls.length).toBe(1);
  });

  it('It should return a middleware error by token not provided', async () => {
    tokenMock.mockReturnValue({
      verify: () => 1
    });
    const requestMock = httpMocks.createRequest({
      headers: {
        authorization: undefined
      }
    });
    const responseMock = httpMocks.createResponse();

    nextMock.mockReturnValue({
      next: () => true
    });

    const controller = new AuthMiddleware(tokenMock());
    controller.handler(requestMock, responseMock, nextMock());
    const res = responseMock._getJSONData();

    expect(responseMock.statusCode).toBe(401);
    expect(res.message).toBeDefined();
  });

  it('It should return a middleware error by invalid or expired token', async () => {
    tokenMock.mockReturnValue({
      verify: () => null
    });
    const requestMock = httpMocks.createRequest({
      headers: {
        authorization: 'eyr4r$r4t45tk902k$/f4433t'
      }
    });
    const responseMock = httpMocks.createResponse();

    nextMock.mockReturnValue({
      next: () => true
    });

    const controller = new AuthMiddleware(tokenMock());
    controller.handler(requestMock, responseMock, nextMock());
    const res = responseMock._getJSONData();

    expect(responseMock.statusCode).toBe(401);
    expect(res.message).toBeDefined();
  });
});
