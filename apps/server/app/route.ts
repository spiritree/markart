import * as Router from "koa-router";
import {
  AuthController,
  HomeController,
  ArticleController,
  TagController,
  CommentController,
  CategoryController,
  MessageController,
  OptionController
} from "./controller";
import { bindRoutes } from "trafficlight";

export default function(app: any) {
  const routerRoutes = new Router({ prefix: "/api" });
  bindRoutes(routerRoutes, [
    HomeController,
    AuthController,
    ArticleController,
    TagController,
    CommentController,
    CategoryController,
    MessageController,
    OptionController
  ]);
  app.use(routerRoutes.routes());
  app.use(routerRoutes.allowedMethods());
}
