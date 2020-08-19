import { HttpException } from './http.exception';

export class EmailAlreadyExistsException extends HttpException {
  constructor () {
    super(401, 'El email ingresado ya se encuentra registrado');
  }
}
