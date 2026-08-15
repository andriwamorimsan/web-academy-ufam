import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('Auth Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**  implementar - 2,5
  it('should sign up user', async () => {
  
  });
  */

  afterAll(async () => {
    await connection.close();
  });
});
