import { inject } from 'inversify';
import { controller, BaseHttpController, httpPost, requestBody } from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/dts/results';
import { UserRepository } from '../../repositories/user.repository';
import { Notification } from '../../services/notification.service';
import { WelcomeNotification } from '../../notifications';
import { EmailAlreadyExistsException } from '../../exceptions';
import { randomString, createHash } from '../../helpers';
import { type } from '../../config';
import { User } from '../../models/user.model';

@controller('/auth')
export class RegisterController extends BaseHttpController {
  private readonly userRepository: UserRepository;
  private readonly notification: Notification;

  constructor (
    @inject(type.UserRepository) userRepository: UserRepository,
    @inject(type.Notification) notification: Notification
  ) {
    super();
    this.userRepository = userRepository;
    this.notification = notification;
  }

  @httpPost('/register')
  public async register (@requestBody() data: User): Promise<JsonResult> {
    try {
      const { email } = data;
      const user = await this.userRepository.findByEmail(email);
      if (user) throw new EmailAlreadyExistsException();
      const userData = this.prepareNewUserData(data);
      const newUser = await this.userRepository.create(userData);
      this.sendWelcomeNotification(newUser);
      return this.json(newUser, 201);
    } catch (error) {
      return this.json({ status: error.status, message: error.message }, error.status);
    }
  }

  private prepareNewUserData (user: User): User {
    const password = createHash(user.password);
    const confirmationCode = randomString();

    return { ...user, password, confirmationCode };
  }

  private sendWelcomeNotification (user: User): void {
    const template = new WelcomeNotification(user).mail();
    this.notification.send(user.email, 'Bienvenido(a)', template);
  }
}
