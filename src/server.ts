import express from 'express';
type IFMiddleware = (app: express.Express) => Promise<void>;
class Server {
  private _middleware!: Array<IFMiddleware>;
  private _port!: number;
  private _app!: express.Express;
  constructor(port: number, middleware: Array<IFMiddleware>) {
    this._port = port;
    this._middleware = middleware;
    this._app = express();
  }
  private async _bindMiddleware() {
    for (let i = 0; i < this._middleware.length; i++) {
      await this._middleware[i](this._app);
    }
  }
  public async run() {
    await this._bindMiddleware();
    this._app.listen(this._port, () => {
      console.log(this._port, 'is running');
    });
  }
}
export default Server;
