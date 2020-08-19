import { Layout } from './layout.notification';
import { User } from '../models/user.model';

export class WelcomeNotification {
  private user: User;

  private layout: Layout = new Layout()

  constructor (user: User) {
    this.user = user;
  }

  public mail (): string {
    return this.layout.template(
      ` <div style="text-align: center;">
          <h3>Tu cuenta ha sido creada:</h3> ${this.user.email}
        </div>
      `
    );
  }
}
