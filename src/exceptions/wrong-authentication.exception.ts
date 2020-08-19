import { HttpException } from './http.exception';

export class WrongAuthenticationException extends HttpException {
  constructor () {
    super(401, 'Las credenciales ingresadas son inválidas');
  }
}
