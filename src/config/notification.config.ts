import { config } from './';

export const notificationConfig = {
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  secure: true,
  auth: {
    user: config.MAIL_USERNAME,
    pass: config.MAIL_PASSWORD
  }
};
