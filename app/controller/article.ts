import { ArticleService } from "../service/article";
import MessageHandler from '../utils/messageHandler';
import { Controller, Ctx, Get, Post, Delete, Put, Patch, Body, QueryParams, Param } from "trafficlight";

@Controller("/article")
export default class ArticleController {

  @Get()
  public async getArticleList(@Ctx() ctx: any, @QueryParams() queryParams: any): Promise<Object> {
    const result = await ArticleService.getArticleList(ctx, queryParams);
    console.log(result)
    if (typeof(result) === 'string') {
      return MessageHandler.handleError({ ctx, message: result });
    }
    if (result) {
      return MessageHandler.handleSuccess({
        ctx,
        result: result
      });
    }
  }

  @Post()
  public async postArticle(@Ctx() ctx: any, @Body() body: any): Promise<Object> {
    const result = await ArticleService.postArticle(ctx, body);
    if (typeof(result) === 'string') {
      return MessageHandler.handleError({ ctx, message: result });
    }
    if (result) {
      return MessageHandler.handleSuccess({
        ctx,
        message: result.message
      });
    }
  }

  @Get('/:id')
  public async getAritcleDetail (@Ctx() ctx: any, @Param('id') id: any) {
    const result = await ArticleService.getArticleDetail(ctx, id);
    if (typeof(result) === 'string') {
      return MessageHandler.handleError({ ctx, message: result });
    }
    if (result) {
      return MessageHandler.handleSuccess({
        ctx,
        message: result.message
      });
    }
  }

  @Delete('/:id')
  public async deleteArticle (@Ctx() ctx: any, @Param('id') id: any) {
    const result = await ArticleService.deleteArticle(ctx, id);
    if (typeof(result) === 'string') {
      return MessageHandler.handleError({ ctx, message: result });
    }
    if (result) {
      return MessageHandler.handleSuccess({
        ctx,
        message: result.message
      });
    }
  }

  @Put('/:id')
  public async putArticle (@Ctx() ctx: any, @Param('id') id: any, @Body() body: any) {
    const result = await ArticleService.putArticle(ctx, id, body);
    if (typeof(result) === 'string') {
      return MessageHandler.handleError({ ctx, message: result });
    }
    if (result) {
      return MessageHandler.handleSuccess({
        ctx,
        message: result.message
      });
    }
  }

  @Patch('/:id')
  public async patchArticle (@Ctx() ctx: any, @Param('id') id: any, @Body() body: any) {
    const result = await ArticleService.patchArticle(ctx, id, body);
    if (typeof(result) === 'string') {
      return MessageHandler.handleError({ ctx, message: result });
    }
    if (result) {
      return MessageHandler.handleSuccess({
        ctx,
        message: result.message
      });
    }
  }

  @Get('/all')
  public async getAllArticle (@Ctx() ctx: any) {
    const result = await ArticleService.getAllArticle(ctx);
    if (typeof(result) === 'string') {
      return MessageHandler.handleError({ ctx, message: result });
    }
    if (result) {
      return MessageHandler.handleSuccess({
        ctx,
        result: result.result,
        message: result.message
      });
    }
  }
}