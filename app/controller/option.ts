import { OptionService } from '../service/option';
import MessageHandler from '../utils/messageHandler';
import { Controller, Ctx, Get, Put, Body } from "trafficlight";

@Controller("/option")
export default class OptionController {
  
  @Get()
  public async getOption(@Ctx() ctx: any): Promise<Object> {
    const res = await OptionService.getOption(ctx)
    if (typeof(res) === 'string') {
      return MessageHandler.handleError({ ctx, message: res });
    }
    if (res) {
      return MessageHandler.handleSuccess({
        ctx,
        result: res.result,
        message: res.message
      });
    }
  }

  @Put()
  public async putOption(@Ctx() ctx: any, @Body() body: any): Promise<Object> {
    const res = await OptionService.putOption(ctx, body)
    if (typeof(res) === 'string') {
      return MessageHandler.handleError({ ctx, message: res });
    }
    if (res) {
      return MessageHandler.handleSuccess({
        ctx,
        message: res.message
      });
    }
  }
}