import MessageHandler from "../utils/messageHandler";
import { Controller, Ctx, Get, Post, Put, Body } from "trafficlight";
import { AuthService } from "../service/auth";

@Controller("/auth")
export default class AuthController {
  @Post("/login")
  public async login(@Ctx() ctx: any, @Body() body: any): Promise<Object> {
    const result = await AuthService.login(ctx, body);
    if (typeof result === "string") {
      return MessageHandler.handleError({ ctx, message: result });
    }
    if (result) {
      return MessageHandler.handleSuccess({
        ctx,
        result: result,
        message: "登陆成功"
      });
    }
  }

  @Get()
  public async getAuth(@Ctx() ctx: any): Promise<Object> {
    const result = await AuthService.getAuth(ctx);
    if (result) {
      return MessageHandler.handleSuccess({
        ctx,
        result: result,
        message: "获取用户资料成功"
      });
    } else {
      return MessageHandler.handleError({ ctx, message: "获取用户资料失败" });
    }
  }

  @Put()
  public async putAuth(@Ctx() ctx: any, @Body() body: any): Promise<Object> {
    const result = await AuthService.putAuth(ctx, body);
    if (typeof result === "string") {
      return MessageHandler.handleError({ ctx, message: result });
    }
    if (result) {
      return MessageHandler.handleSuccess({
        ctx,
        result: result,
        message: "修改用户资料成功"
      });
    } else {
      return MessageHandler.handleError({ ctx, message: "修改用户资料失败" });
    }
  }
}
