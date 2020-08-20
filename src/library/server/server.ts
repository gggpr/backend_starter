import 'reflect-metadata';
import {createConnection, Connection} from 'typeorm';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import TestResolver from '../../resolver/test.resolver';
import {SERVER_CONFIG} from '../../config/server.config';
import {Request} from './interface';

class Server {
  private _express: express.Express = express();
  private _apollo!: ApolloServer;
  /**
   * 데이타 베이스에 접속합니다.
   * 단위 테스트를 위해 분리 하였습니다.
   */
  public async databasesConnect(): Promise<Connection> {
    return await createConnection();
  }
  /**
   * 아폴로 서버 셋업
   * Resolver를 여기다가 넣으세요.
   * GraphQl 엔드포인트를 여기서 설정합니다.
   */
  public async apolloSetup() {
    try {
      this._apollo = new ApolloServer({
        schema: await buildSchema({
          resolvers: [TestResolver],
        }),
        context: ({req}) => {
          const context = {
            req,
            user: (req as Request).user,
          };
          return context;
        },
      });
      this._apollo.applyMiddleware({
        app: this._express,
        path: SERVER_CONFIG.graphqlEndPoint,
      });
    } catch (err) {
      console.log(err);
    }
  }
  private _expressListenStart() {
    this._express.listen(SERVER_CONFIG.serverPort, () => {
      console.log(`
██████╗ ██╗███████╗██╗   ██╗██╗     ██╗███████╗███████╗
██╔══██╗██║╚══███╔╝╚██╗ ██╔╝██║     ██║██╔════╝██╔════╝
██████╔╝██║  ███╔╝  ╚████╔╝ ██║     ██║█████╗  █████╗  
██╔══██╗██║ ███╔╝    ╚██╔╝  ██║     ██║██╔══╝  ██╔══╝  
██████╔╝██║███████╗   ██║██╗███████╗██║██║     ███████╗
╚═════╝ ╚═╝╚══════╝   ╚═╝╚═╝╚══════╝╚═╝╚═╝     ╚══════╝
-------------------------------------------------------
 endpoint: http://${SERVER_CONFIG.serverDomainName}:${SERVER_CONFIG.serverPort}/${SERVER_CONFIG.graphqlEndPoint}
        `);
    });
  }
  public async run() {
    // 데이타 베이스에 접속
    try {
      await this.databasesConnect();
      await this.apolloSetup();
      this._expressListenStart();
    } catch (err) {
      console.log(err);
    }
  }
}

export default Server;
