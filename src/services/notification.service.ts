import { injectable } from 'inversify';
import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import { notificationConfig, config } from '../config';

@injectable()
export class Notification {
  private transporter: Transporter

  constructor () {
    this.transporter = createTransport(notificationConfig);
  }

  public send (to: string, subject: string, html: string): SentMessageInfo {
    return this.transporter.sendMail({
      from: `${config.MAIL_FROM_NAME} <${config.MAIL_FROM_ADDRESS}>`,
      to,
      subject,
      html
    });
  }
}
