import { CommentService } from '../service/comment'
import MessageHandler from '../utils/messageHandler'
import {
  Controller,
  Ctx,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  QueryParams,
  Param
} from 'trafficlight'

@Controller('/comment')
export default class CommentController {
  @Get()
  public async getCommentList(
    @Ctx() ctx: any,
    @QueryParams() queryParams: any
  ): Promise<Object> {
    const res = await CommentService.getCommentList(ctx, queryParams)
    if (typeof res === 'string') {
      return MessageHandler.handleError({ ctx, message: res })
    }
    if (res) {
      return MessageHandler.handleSuccess({
        ctx,
        result: res.result,
        message: res.message
      })
    }
  }

  @Post()
  public async postComment(
    @Ctx() ctx: any,
    @Body() body: any
  ): Promise<Object> {
    const res = await CommentService.postComment(ctx, body)
    if (typeof res === 'string') {
      return MessageHandler.handleError({ ctx, message: res })
    }
    if (res) {
      return MessageHandler.handleSuccess({
        ctx,
        result: res.result,
        message: res.message
      })
    }
  }

  @Post('/like')
  public async likeComment(
    @Ctx() ctx: any,
    @Body() body: any
  ): Promise<Object> {
    const res = await CommentService.likeComment(ctx, body)
    if (typeof res === 'string') {
      return MessageHandler.handleError({ ctx, message: res })
    }
    if (res) {
      return MessageHandler.handleSuccess({
        ctx,
        result: res.result,
        message: res.message
      })
    }
  }

  @Delete('/:id')
  public async deleteComment(
    @Ctx() ctx: any,
    @Param('id') id: string
  ): Promise<Object> {
    const res = await CommentService.deleteComment(ctx, id)
    if (typeof res === 'string') {
      return MessageHandler.handleError({ ctx, message: res })
    }
    if (res) {
      return MessageHandler.handleSuccess({
        ctx,
        message: res.message
      })
    }
  }

  @Patch('/:id')
  public async getAritcleDetail(
    @Ctx() ctx: any,
    @Param('id') id: string,
    @Body() body: any
  ): Promise<Object> {
    const res = await CommentService.patchComment(ctx, id, body)
    if (typeof res === 'string') {
      return MessageHandler.handleError({ ctx, message: res })
    }
    if (res) {
      return MessageHandler.handleSuccess({
        ctx,
        message: res.message
      })
    }
  }
}
