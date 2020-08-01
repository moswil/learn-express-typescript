import Logger from './logger';
import { Server } from 'http';

const logger = new Logger();

const handleException = (type: string, server?: Server): void => {
  process.on(type, (err: Error) => {
    logger.log('error', `ERROR: ${err.name}: ${err.message}`);
    server?.close(() => {
      process.exit(1);
    });
  });
};

export default handleException;
