import 'dotenv/config';
import App from './app';
import PostController from './posts/post.controller';
import UserController from './users/user.controller';
import validateEnv from './utils/validateEnv';
import exceptionHandler from './utils/handleExceptions';

validateEnv();

exceptionHandler('uncaughtException');

const app = new App([new PostController(), new UserController()]);

const server = app.listen();

exceptionHandler('unhandledRejection', server);
