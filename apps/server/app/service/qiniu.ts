const qn = require('qn');
import * as config from '../../config';
import { IResult } from '../utils/messageHandler';

export class qiniuService {
  public static async getToken(ctx: any): Promise<IResult> {
    const client = await qn.create(config.QINIU);
    const token = client.uploadToken();
    return {
      ctx,
      result: token,
      message: '获取七牛token成功'
    };
  }
}
