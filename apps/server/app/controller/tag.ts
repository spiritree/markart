import { TagService } from '../service/tag'
import MessageHandler from '../utils/messageHandler'
import {
  Controller,
  Ctx,
  Get,
  Post,
  Delete,
  Put,
  Patch,
  Body,
  QueryParams,
  Param
} from 'trafficlight'

@Controller('/tag')
export default class TagController {
  @Get()
  public async getTagList(
    @Ctx() ctx: any,
    @QueryParams() queryParams: any
  ): Promise<Object> {
    const res = await TagService.getTagList(ctx, queryParams)
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
  public async postTag(@Ctx() ctx: any, @Body() body: any): Promise<Object> {
    const res = await TagService.postTag(ctx, body)
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

  @Patch()
  public async sortTag(@Ctx() ctx: any, @Body() body: any): Promise<Object> {
    const res = await TagService.sortTag(ctx, body)
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

  @Put('/:id')
  public async putTag(
    @Ctx() ctx: any,
    @Param('id') id: string,
    @Body() body: any
  ): Promise<Object> {
    const res = await TagService.putTag(ctx, id, body)
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

  @Delete('/:id')
  public async deleteTag(
    @Ctx() ctx: any,
    @Param('id') id: string
  ): Promise<Object> {
    const res = await TagService.deleteTag(ctx, id)
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
