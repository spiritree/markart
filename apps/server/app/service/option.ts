import Option from '../model/option'
import { IResult } from '../utils/messageHandler'

export class OptionService {
  /**
   * 获取配置
   *
   * @static
   * @param {*} ctx
   * @returns {(Promise<IResult | string>)}
   * @memberof OptionService
   */
  public static async getOption(ctx: any): Promise<IResult | string> {
    const option = await Option.findOne().catch(err => ctx.throw(500, err))
    if (option) {
      return {
        ctx,
        result: option,
        message: '获取配置成功'
      }
    } else {
      const message: string = '获取配置失败'
      return message
    }
  }

  /**
   * 修改配置信息
   *
   * @static
   * @param {*} ctx
   * @param {*} body
   * @returns {(Promise<IResult | string>)}
   * @memberof OptionService
   */
  public static async putOption(
    ctx: any,
    body: any
  ): Promise<IResult | string> {
    const { _id } = body
    const option = await (_id
      ? Option.findByIdAndUpdate(_id, body, { new: true })
      : new Option(body).save()
    ).catch(err => ctx.throw(500, err))
    if (option) {
      return {
        ctx,
        result: option,
        message: '修改配置成功'
      }
    } else {
      const message: string = '修改配置失败'
      return message
    }
  }
}
