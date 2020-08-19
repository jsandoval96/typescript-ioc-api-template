import { InversifyExpressServer } from 'inversify-express-utils';
import { Application, urlencoded, json } from 'express';
import { config, dbConfig } from './config';
import { createConnection } from 'typeorm';
import cors from 'cors';
import helmet from 'helmet';

export class App {
  private server: InversifyExpressServer;

  constructor (server: InversifyExpressServer) {
    this.server = server;
  }

  public async initializeServer (): Promise<Application> {
    this.server.setConfig(app => {
      app.use(urlencoded({ extended: true }));
      app.use(json());
      app.use(cors());
      app.use(helmet());
    });
    const app: Application = this.server.build();
    app.listen(config.API_PORT);

    return app;
  }

  static async initializeDatabase (): Promise<void> {
    await createConnection(dbConfig);
    console.log('Database runs successfully');
  }
}
