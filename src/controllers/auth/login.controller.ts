import { inject } from 'inversify';
import { Response } from 'express';
import { controller, BaseHttpController, httpPost, requestBody, httpGet, response } from 'inversify-express-utils';
import { UserRepository } from '../../repositories/user.repository';
import { Token } from '../../services/token.service';
import { type } from '../../config';
import { compareHash } from '../../helpers';
import { User } from '../../models/user.model';
import { JsonResult } from 'inversify-express-utils/dts/results';
import { WrongAuthenticationException, TokenInvalidException } from '../../exceptions';

@controller('/auth')
export class LoginController extends BaseHttpController {
  private readonly userRepository: UserRepository;
  private readonly token: Token;

  constructor (
    @inject(type.UserRepository) userRepository: UserRepository,
    @inject(type.Token) token: Token
  ) {
    super();
    this.userRepository = userRepository;
    this.token = token;
  }

  @httpPost('/login')
  public async login (@requestBody() data: User): Promise<JsonResult> {
    try {
      const { email, password } = data;
      const user = await this.userRepository.findByEmail(email);
      if (!user || !password || !user.password) throw new WrongAuthenticationException();
      const isValid = compareHash(password, user.password);
      if (!isValid) throw new WrongAuthenticationException();
      const token = this.token.create(user.id);

      return this.json({ token });
    } catch (error) {
      return this.json({ status: error.status, message: error.message }, error.status);
    }
  }

  @httpGet('/user', type.AuthMiddleware)
  public async user (@response() res: Response): Promise<JsonResult> {
    try {
      const id = res.locals.auth;
      if (!id) throw new TokenInvalidException();
      const user = await this.userRepository.findById(id);
      return this.json({ user });
    } catch (error) {
      return this.json({ status: error.status, message: error.message }, error.status);
    }
  }
}
