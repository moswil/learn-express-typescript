import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/HttpException';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new HttpException(404, 'Not Found');
  next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (error: HttpException, req: Request, res: Response, next?: NextFunction): void => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong!';
  res.status(statusCode).json({
    status: error.status,
    message,
    statusCode,
  });
};

export default errorMiddleware;
export const errors = {
  notFound,
};
