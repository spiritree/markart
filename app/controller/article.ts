import { ArticleService } from "../service/article";
import MessageHandler from '../utils/messageHandler';
import { Controller, Ctx, Get, Post, Delete, Put, Patch, Body, QueryParams, Param } from "trafficlight";

@Controller("/article")
export default class ArticleController {

  @Get()
  public async getArticleList(@Ctx() ctx: any, @QueryParams() queryParams: any): Promise<Object> {
    const res = await ArticleService.getArticleList(ctx, queryParams);
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
  public async postArticle(@Ctx() ctx: any, @Body() body: any): Promise<Object> {
    const res = await ArticleService.postArticle(ctx, body);
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

  // 坑点：/all必须在/:id前面，否则会被覆盖
  @Get("/all")
  public async getAllArticle (@Ctx() ctx: any) {
    const res = await ArticleService.getAllArticle(ctx);
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

  @Get("/:id")
  public async getAritcleDetail (@Ctx() ctx: any, @Param("id") id: string) {
    const res = await ArticleService.getArticleDetail(ctx, id);
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

  @Delete("/:id")
  public async deleteArticle (@Ctx() ctx: any, @Param("id") id: string) {
    const res = await ArticleService.deleteArticle(ctx, id);
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
  public async putArticle (@Ctx() ctx: any, @Param("id") id: string, @Body() body: any) {
    const res = await ArticleService.putArticle(ctx, id, body);
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
  public async patchArticle (@Ctx() ctx: any, @Param("id") id: string, @Body() body: any) {
    const res = await ArticleService.patchArticle(ctx, id, body);
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