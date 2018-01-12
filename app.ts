import "reflect-metadata";
import * as config from "./config";
import * as http from "http";
import * as Koa from "koa";
import BindRoutes from "./app/route";
import mongooseConnect from "./app/lib/mongoose";
import { Middleware } from "koa";
import { middlewareList } from "./app/middleware";

class App {
  public app: Koa;
  private handlers: any = {};

  constructor() {
    this.app = new Koa();
    this.connectDB();
    this.initMiddleware();
    this.bindRouter();
    this.server();
  }

  private connectDB(): void {
    mongooseConnect.connect();
    mongooseConnect.loadPlugin();
  }

  private initMiddleware(): void {
    middlewareList.forEach(middleware =>
      this.app.use(this.requireMiddleware(middleware))
    );
  }

  private requireMiddleware(path: any): Middleware {
    // 开发模式下，输出加载中间件链的日志
    if (process.env.NODE_ENV === "development" || process.env.LOG_LEVEL) {
      console.log(`-> setup ${path}`);
    }

    const handler = require(`./app/middleware/${path}`);

    // 加载中间件
    if (handler.init) {
      handler.init(this.app);
    }

    return (this.handlers[path] = handler);
  }

  private bindRouter(): void {
    BindRoutes(this.app);
  }

  private server(): void {
    http.createServer(this.app.callback()).listen(config.APP.PORT, () => {
      console.log(`node server run port at ${config.APP.PORT}`);
    });
  }
}

export default new App().app;
