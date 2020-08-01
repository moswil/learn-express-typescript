import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import IController from './interfaces/controller.interface';
import { errors } from './middleware/error.middleware';
import Logger from './utils/logger';
import { Server } from 'http';

class App {
  public app: Application;
  public port: number;
  public logger: Logger;

  constructor(controllers: IController[]) {
    this.app = express();
    this.logger = new Logger();
    this.port = Number(process.env.PORT) || 3000;

    this.connectToDatabase();
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

  private initializeContollers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/v1', controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(this.logger.getRequestErrorLogger());
    this.app.use(errors.notFound);
    this.app.use(errors.errorMiddleware);
  }

  public getServer(): Application {
    return this.app;
  }

  private connectToDatabase() {
    const { MONGO_URL } = process.env;
    mongoose
      .connect(`${MONGO_URL}`, { useUnifiedTopology: true, useNewUrlParser: true })
      .then(() => {
        console.log(`Connected to the DB successfully`);
      })
      .catch((err) => console.log(err));
  }

  public listen(): Server {
    return this.app.listen(this.port, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export default App;
