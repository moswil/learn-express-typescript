import { cleanEnv, str, port } from 'envalid';

const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    MONGO_URL: str(),
    PORT: port(),
  });
};

export default validateEnv;
