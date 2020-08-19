import { HttpException } from './http.exception';

export class TokenInvalidException extends HttpException {
  constructor () {
    super(401, 'Token inválido');
  }
}
