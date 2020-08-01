import { NextFunction, Response, Request } from 'express';
import Logger from './logger';

const logger = new Logger();

const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch((error: string) => {
      logger.log('error', error);
      next(error);
    });
  };
};

export default catchAsync;
