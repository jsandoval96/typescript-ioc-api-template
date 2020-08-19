import { Token } from '../../src/services/token.service';

describe('Token Service', () => {
  it('Should return a token created and verified', () => {
    const controller = new Token();
    const token = controller.create(5, '5m', 'testkey');
    const verified = controller.verify(token, 'testkey');

    expect(token).toBeTruthy();
    expect(verified).toBe(5);
  });
});
