import { cleanEnv, port } from 'envalid';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

function validateEnv() {
  return cleanEnv(process.env, {
    PORT: port({ default: 5590 }),
  });
}

export default validateEnv;
