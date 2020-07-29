import 'dotenv/config';
import App from './app';
import PostController from './posts/post.controller';
import UserController from './user/user.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new PostController(), new UserController()]);

app.listen();
