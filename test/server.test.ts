import {describe, it} from 'mocha';
import {use, expect} from 'chai';
import cap from 'chai-as-promised';
import Server from '../src/library/server/server';

use(cap);

describe('Create server test', () => {
  const server = new Server();

  it('Database', async () => {
    await expect(
      (async () => {
        const connection = await server.databasesConnect();
        await connection.close();
      })()
    ).to.not.rejected;
  });
  it('Apollo', async () => {
    await expect(server.apolloSetup()).to.be.not.rejected;
  });
});
