import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('tipoUsuario Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**  implementar - 2,5
  it('should get all user types', async () => {
   
  });
  */

  afterAll(async () => {
    await connection.close();
  });
});
