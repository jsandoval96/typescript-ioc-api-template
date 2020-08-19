import 'dotenv/config';
import 'reflect-metadata';
import './config/register.config';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container, asyncContainer, config } from './config/';
import { App } from './app';

const server = new InversifyExpressServer(container, null, { rootPath: '/api' });
const app = new App(server);

App.initializeDatabase().then(() => {
  container.loadAsync(asyncContainer);
  app.initializeServer();
  console.log(`App run on port: ${config.API_PORT}`);
});

export default server;
