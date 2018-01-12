import * as Koa from "koa";

export = async (ctx: Koa.Context, next: Function) => {
  try {
    await next();
  } catch (error) {
    ctx.body = { code: 0, message: "服务器内部错误" };
  }
  if (ctx.status === 404 || ctx.status === 405)
    ctx.body = { code: 0, message: "无效的api请求" };
};
