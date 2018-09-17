import * as Koa from 'koa'

export interface IResult {
  ctx: Koa.Context
  result?: Object
  message: string
}

export default class MessageHandler {
  /**
   * 处理成功请求
   * @static
   * @param {*} { ctx, message = "请求失败", err = null }
   * @returns {ctx.response.body} { code: 1, message, result }
   * @memberof MessageHandler
   */
  public static handleSuccess({
    ctx,
    message = '请求成功',
    result = null
  }: any) {
    return (ctx.response.body = { code: 1, message, result })
  }
  /**
   * 处理失败请求
   * @static
   * @param {*} { ctx, message = "请求失败", err = null }
   * @returns {ctx.body} { code: 0, message, debug: err }
   * @memberof MessageHandler
   */
  public static handleError({ ctx, message = '请求失败', err = null }: any) {
    return (ctx.body = { code: 0, message, debug: err })
  }
}
