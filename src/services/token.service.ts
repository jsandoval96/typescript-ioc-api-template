import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { config } from '../config';

@injectable()
export class Token {
  public readonly expiresIn: string = config.JWT_EXPIRATION;

  private readonly secret: string = config.JWT_KEY;

  public create (id: number, expiresIn: string = this.expiresIn, secret: string = this.secret): string {
    return jwt.sign({ id }, secret, { expiresIn });
  }

  public verify (token: string, secret: string = this.secret): number | undefined {
    const decoded: any = jwt.verify(token, secret);
    return decoded?.id || undefined;
  }
}
