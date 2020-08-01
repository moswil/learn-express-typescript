import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/HttpException';
import Logger from '../utils/logger';

const logger = new Logger();

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new HttpException(404, `Can't find ${req.originalUrl} on this server`);
  next(error);
};

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new HttpException(400, message);
};

const handleDuplicateErrorDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/)[0];
  const message = `Duplicate field value ${value}. Please use another`;
  return new HttpException(400, message);
};

const sendErrorDev = (err: HttpException, res: Response) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err,
    message: err.message || 'Something went wrong!',
    stack: err.stack,
    statusCode,
    status: err.status,
  });
};

const sendErrorProd = (err: HttpException, res: Response) => {
  if (err.isOperational) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      status: err.status,
      message: err.message || 'Something went wrong!',
      statusCode,
    });
  } else {
    // 1. Log to console
    logger.log('error', err.message, err);

    // 2. Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (error: HttpException | any, req: Request, res: Response, next?: NextFunction): void => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    let err = { ...error };
    if (error.name === 'CastError') err = handleCastErrorDB(err);
    if (error.code === 11000) err = handleDuplicateErrorDB(err);
    sendErrorProd(err, res);
  }
};

// export default errorMiddleware;
export const errors = {
  notFound,
  errorMiddleware,
};
