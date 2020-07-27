import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log(
    `[${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}] \"${req.method} ${req.path} HTTP/${
      req.httpVersion
    }\" ${res.statusCode}`,
  );
  next();
};

export default loggerMiddleware;
