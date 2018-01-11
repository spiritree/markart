import * as Router from 'koa-router';
import { bindRoutes } from 'trafficlight';
import { HomeController } from './controller'

export default function(app: any) {
  const routerRoutes = new Router({ prefix: '/api' })
  bindRoutes(routerRoutes, [ HomeController ])
  app.use(routerRoutes.routes())
  app.use(routerRoutes.allowedMethods())
}