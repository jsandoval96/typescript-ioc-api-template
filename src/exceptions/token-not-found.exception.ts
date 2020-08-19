import { HttpException } from './http.exception';

export class TokenNotFoundException extends HttpException {
  constructor () {
    super(401, 'Token no encontrado');
  }
}
