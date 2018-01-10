import * as Koa from 'koa'
import * as http from 'http'
import { Middleware } from 'koa';
import { middleware } from './app/middleware'
import * as config from './config'
// const mongodb = require('./mongodb')
// const router = require('./route')

class App {
  public app: Koa
  private handlers: any = {}

  constructor() {
    this.app = new Koa()
    this.middleware()
    this.server()
  }

  private middleware(): void {
    middleware.forEach((middleware) => this.app.use(this.requireMiddleware(middleware)));
  }

  private requireMiddleware(path: any): Middleware {
    // 开发模式下，输出加载中间件链的日志
    if (process.env.NODE_ENV === 'development' || process.env.LOG_LEVEL) {
      console.log(`-> setup ${path}`);
      this.app.use(async (next) => {
        await next;
        console.log(`<- setup ${path}`, new Date());
      });
    }

    const handler = require(`./app/middleware/${path}`);

    // 加载中间件
    if (handler.init) {
      handler.init(this.app);
    }

    return this.handlers[path] = handler;
  }

  private server(): void {
    http.createServer(this.app.callback()).listen(config.APP.PORT, () => {
      console.log(`node-Koa Run！port at ${config.APP.PORT}`)
    })
  }
}

export default new App().app;
// data secer
// mongodb.connect()

// mongoosePaginate.paginate.options = {
// 	limit: config.APP.LIMIT
// }


// middleware


// app
//   .use(router.routes())
//   .use(router.allowedMethods())
