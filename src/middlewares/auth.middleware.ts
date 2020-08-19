import { injectable, inject } from 'inversify';
import { BaseMiddleware, request, response, next } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import { Token } from '../services/token.service';
import { TokenInvalidException, TokenNotFoundException } from '../exceptions';
import { type } from '../config/types.config';

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  private readonly token: Token;

  constructor (@inject(type.Token) token: Token) {
    super();
    this.token = token;
  }

  public handler (@request() req: Request, @response() res: Response, @next() to: NextFunction): Response | void {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new TokenNotFoundException();
      const id = this.token.verify(authorization);
      if (!id) throw new TokenInvalidException();
      res.locals.auth = id;
      to();
    } catch (error) {
      return res.status(error.status || 500).json({ status: error.status || 500, message: error.message });
    }
  }
}
