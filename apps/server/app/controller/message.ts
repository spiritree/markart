import { MessageService } from '../service/message';
import MessageHandler from '../utils/messageHandler';
import { Controller, Ctx, Get, Post, Delete, Patch, Body, QueryParams, Param } from "trafficlight";

@Controller("/message")
export default class MessageController {
  
  @Get()
  public async getMessageList(@Ctx() ctx: any, @QueryParams() queryParams: any): Promise<Object> {
    const res = await MessageService.getMessageList(ctx, queryParams)
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

  @Post()
  public async postMessage(@Ctx() ctx: any, @Body() body: any): Promise<Object> {
    const res = await MessageService.postMessage(ctx, body)
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

  @Delete("/:id")
  public async deleteMessage(@Ctx() ctx: any, @Param("id") id: string): Promise<Object> {
    const res = await MessageService.deleteMessage(ctx, id)
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

  @Patch("/:id")
  public async patchMessage(@Ctx() ctx: any, @Param("id") id: string, @Body() body: any): Promise<Object> {
    const res = await MessageService.patchMessage(ctx, id, body)
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