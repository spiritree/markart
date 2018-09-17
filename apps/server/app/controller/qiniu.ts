import { qiniuService } from '../service/qiniu'
import MessageHandler from '../utils/messageHandler'
import { Controller, Ctx, Get } from 'trafficlight'

@Controller('/qiniu')
export default class QiniuController {
  @Get()
  public async getToken(@Ctx() ctx: any): Promise<Object> {
    const res = await qiniuService.getToken(ctx)
    return MessageHandler.handleSuccess({
      ctx,
      result: res.result,
      message: res.message
    })
  }
}
