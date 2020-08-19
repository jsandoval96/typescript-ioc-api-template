import 'dotenv/config';
import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyExpressServer, controller } from 'inversify-express-utils';
import { App } from '../../src/app';

describe('App', () => {
  it('App run success', async (done) => {
    const container = new Container();

    @controller('/')
    class TestController {}

    const server = new InversifyExpressServer(container, null, { rootPath: '/api' });

    const app = new App(server);
    const hasRun = await app.initializeServer();
    expect(hasRun).toBeTruthy();

    done();
  });
});
