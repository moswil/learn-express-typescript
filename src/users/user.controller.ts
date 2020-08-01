import { Router, Request, Response, NextFunction } from 'express';

import IController from '../interfaces/controller.interface';
import catchAsync from '../utils/catchAsync';

class UserController implements IController {
  public path = '/users';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getUser);
  }

  private getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      user: 'Moses',
    });
  });
}

export default UserController;
