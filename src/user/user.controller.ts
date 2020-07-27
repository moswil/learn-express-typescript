import { Router, Request, Response, NextFunction } from 'express';

import Controller from '../interfaces/controller.interface';
import Logger from '../utils/logger';

class UserController implements Controller {
  public path = '/users';
  public router = Router();
  public logger: Logger;

  constructor() {
    this.logger = new Logger();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getUser);
  }

  private getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.logger.log('info', 'Get User');
      res.status(200).json({
        user: 'Moses',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
