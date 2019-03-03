import 'reflect-metadata'
import * as config from './config'
import * as Koa from 'koa'
import BindRoutes from './app/route'
import mongooseConnect from './app/lib/mongoose'
import { Middleware } from 'koa'
import { middlewareList } from './app/middleware'

class App {
  public app: Koa

  constructor() {
    this.app = new Koa()
    this.connectDB()
    this.initMiddleware()
    this.bindRouter()
  }

  private connectDB(): void {
    mongooseConnect.connect()
    mongooseConnect.loadPlugin()
  }

  private initMiddleware(): void {
    middlewareList.forEach(middleware =>
      this.app.use(this.requireMiddleware(middleware))
    )
  }

  private requireMiddleware(path: any): Middleware {
    // middleware logger
    if (process.env.NODE_ENV === 'development' || process.env.LOG_LEVEL) {
      console.log(`-> setup ${path}`)
    }

    const middleware = require(`./app/middleware/${path}`)
    return middleware
  }

  private bindRouter(): void {
    BindRoutes(this.app)
  }
}

export default new App().app.listen(config.APP.PORT, () => {
  console.log(`Koa is listening in ${config.APP.PORT}`)
})
