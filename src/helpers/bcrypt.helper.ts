import bcryptjs from 'bcryptjs';

export const createHash = (password: string): string => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

export const compareHash = (password: string, hash: string): boolean => bcryptjs.compareSync(password, hash);
