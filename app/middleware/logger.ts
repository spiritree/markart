import * as Koa from "koa";

export = async (ctx: Koa.Context, next: Function) => {
  const start: any = new Date();
  await next();
  const end: any = new Date();
  const loadTime: number = end - start;
  console.log(`${ctx.method} ${ctx.url} - ${loadTime}ms`);
};
