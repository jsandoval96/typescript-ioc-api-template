export const config = {
  NODE_ENV: process.env.NODE_ENV || 'developement',
  API_PORT: Number(process.env.API_PORT) || 3001,
  API_URL: process.env.API_URL || '',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_NAME: process.env.DB_NAME || '',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  MAIL_PORT: Number(process.env.MAIL_PORT) || 465,
  MAIL_HOST: process.env.MAIL_HOST || '',
  MAIL_USERNAME: process.env.MAIL_USERNAME || '',
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
  MAIL_ENCRYPTION: process.env.MAIL_ENCRYPTION || 'ssl',
  MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS || '',
  MAIL_FROM_NAME: process.env.MAIL_FROM_NAME || '',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '24h',
  JWT_KEY: process.env.JWT_KEY || ''
};
