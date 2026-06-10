import { cleanEnv, port } from 'envalid';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

function getEnv() {
  return cleanEnv(process.env, {
    PORT: port({ default: 5590 }),
  });
}

export default getEnv;
