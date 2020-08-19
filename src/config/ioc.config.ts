import { Container, AsyncContainerModule } from 'inversify';
import { UserRepository } from '../repositories/user.repository';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { Notification } from '../services/notification.service';
import { Token } from '../services/token.service';
import { type } from '../config';

export const container = new Container();

export const asyncContainer = new AsyncContainerModule(async bind => {
  bind<UserRepository>(type.UserRepository).to(UserRepository).inRequestScope();
  bind<AuthMiddleware>(type.AuthMiddleware).to(AuthMiddleware).inSingletonScope();
  bind<Notification>(type.Notification).to(Notification).inSingletonScope();
  bind<Token>(type.Token).to(Token).inSingletonScope();
});
