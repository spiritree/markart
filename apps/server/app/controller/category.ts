import { CategoryService } from '../service/category';
import MessageHandler from '../utils/messageHandler';
import { Controller, Ctx, Get, Post, Delete, Put, Body, QueryParams, Param } from "trafficlight";

@Controller("/category")
export default class CategoryController {
  
  @Get()
  public async getCategoryList(@Ctx() ctx: any, @QueryParams() queryParams: any): Promise<Object> {
    const res = await CategoryService.getCategoryList(ctx, queryParams)
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
  public async postCategory(@Ctx() ctx: any, @Body() body: any): Promise<Object> {
    const res = await CategoryService.postCategory(ctx, body)
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

  @Put("/:id")
  public async putCategory(@Ctx() ctx: any, @Param("id") id: string, @Body() body: any): Promise<Object> {
    const res = await CategoryService.putCategory(ctx, id, body)
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
  public async deleteCategory(@Ctx() ctx: any, @Param("id") id: string): Promise<Object> {
    const res = await CategoryService.deleteCategory(ctx, id)
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