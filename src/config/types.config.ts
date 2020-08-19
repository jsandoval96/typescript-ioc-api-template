import { Notification } from '../services/notification.service';

export const type = {
  UserRepository: Symbol('UserRepository'),
  AuthMiddleware: Symbol('AuthMiddleware'),
  Notification: Symbol('Notification'),
  Token: Symbol('Token')
};
