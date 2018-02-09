import * as config from "../../config";
import * as Koa from "koa";
import Auth from "../model/auth";
import Crypto from "../utils/crypto";

// 初始化管理员账号中间件(当然这些中间件只有用户访问改网址才会执行)
export = async (ctx: Koa.Context, next: Function) => {
  const username = config.AUTH.defaultUsername;
  const password = Crypto.encrypt(config.AUTH.defaultPassword);

  let result: any = await Auth.find()
    .exec()
    .catch((err: any) => {
      ctx.throw(500, err);
    });
  if (result.length === 0) {
    let user = new Auth({
      username,
      password
    });
    await user.save().catch((err: any) => {
      ctx.throw(500, err);
    });
    console.log("初始化admin账号密码完成!");
  }
  await next();
};
