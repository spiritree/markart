import * as koaBody from "koa-body";

export = koaBody({
  jsonLimit: "10mb",
  formLimit: "10mb",
  textLimit: "10mb"
});
