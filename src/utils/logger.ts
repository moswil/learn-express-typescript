import expressWinston from 'express-winston';
import winston from 'winston';
import e from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(`../config/envs/${process.env.NODE_ENV}`);

const { createLogger, format, transports } = winston;

export default class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = createLogger({
      level: config.logLevel,
      format: format.combine(
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
        format.timestamp({
          format: 'YYYY MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.simple(),
      ),
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      );
    }
  }

  public log(level: string, msg: string): void {
    this.logger.log(level, msg);
  }

  public getRequestLogger(): e.Handler {
    return expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      meta: process.env.NODE_ENV !== 'production', // optional: control whether you want to log the meta data about the request (default to true)
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      colorize: true,
    });
  }

  public getRequestErrorLogger(): e.ErrorRequestHandler {
    return expressWinston.errorLogger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    });
  }
}
