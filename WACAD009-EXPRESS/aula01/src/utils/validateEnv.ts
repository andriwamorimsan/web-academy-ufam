import dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config({ quiet: true });

function validateEnv() {
  return cleanEnv(process.env, {
    NODE_ENV: str({ default: 'development' }),
    PORT: port({ default: 5555 }),
    LOG_DIR: str({ default: 'logs' }),
    LOG_FORMAT: str({ choices: ['simples', 'completo'], default: 'simples' }),
    PRODUCTS_API_URL: str({ default: 'http://localhost:3355/produtos' }),
  });
}

export default validateEnv;
