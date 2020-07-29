import 'dotenv/config';
import App from './app';
import UserController from './user/user.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new UserController()]);

app.listen();
