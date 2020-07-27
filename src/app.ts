import 'dotenv/config';
import express, { Application } from 'express';
import bodyParser from 'body-parser';

import Controller from './interfaces/controller.interface';
import errorMiddleware, { errors } from './middleware/error.middleware';
import Logger from './utils/logger';

class App {
  public app: Application;
  public port: number;
  public logger: Logger;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.logger = new Logger();
    this.port = Number(process.env.PORT) || 3000;

    this.initializeMiddlewares();
    this.initializeContollers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // this.app.use(loggerMiddleware);
    this.app.use(this.logger.getRequestLogger());
  }

  private initializeContollers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/v1', controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(this.logger.getRequestErrorLogger());
    this.app.use(errors.notFound);
    this.app.use(errorMiddleware);
  }

  public getServer(): Application {
    return this.app;
  }

  public listen(): void {
    this.app.listen(this.port, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export default App;
