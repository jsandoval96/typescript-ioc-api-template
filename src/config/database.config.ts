import { ConnectionOptions } from 'typeorm';
import { config } from './';
import path from 'path';

const synchronize: boolean = config.NODE_ENV === 'development';
const logging: boolean = config.NODE_ENV === 'development';

export const dbConfig: ConnectionOptions = {
  type: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [
    path.resolve(__dirname, '../models/*.model{.ts,.js}')
  ],
  cache: {
    duration: 3600000 // 1 hour
  },
  synchronize,
  logging
};
