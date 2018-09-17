import Message from '../model/message'
import Auth from '../utils/auth'
import * as geoip from 'geoip-lite'
import { IResult } from '../utils/messageHandler'

export class MessageService {
  /**
   * 获取留言墙列表
   *
   * @static
   * @param {*} ctx
   * @param {*} queryParams
   * @returns {(Promise<IResult | string>)}
   * @memberof MessageService
   */
  public static async getMessageList(
    ctx: any,
    queryParams: any
  ): Promise<IResult | string> {
    let {
      current_page = 1,
      page_size = 10,
      keyword = '',
      state = ''
    } = queryParams

    // 过滤条件
    const options = {
      sort: { _id: +1 },
      page: Number(current_page),
      limit: Number(page_size)
    }

    // 查询参数
    const querys: any = {}

    if (keyword) {
      const keywordReg = new RegExp(keyword)
      querys['$or'] = [{ content: keywordReg }, { name: keywordReg }]
    }

    // 审核状态查询
    if (['0', '1', '2'].includes(state)) {
      querys.state = Number(state)
    }

    // 前台请求， 重置状态
    if (!Auth.authIsVerified(ctx.request)) {
      querys.state = 1
    }

    // 请求留言
    const message = await Message.paginate(querys, options).catch(err =>
      ctx.throw(500, err)
    )
    if (message) {
      const result = {
        pagination: {
          total: message.total,
          current_page: message.page,
          total_page: message.pages
        },
        list: message.docs
      }
      return { ctx, result, message: '获取留言列表成功' }
    } else {
      const message: string = '获取留言列表失败'
      return message
    }
  }
  /**
   *
   *
   * @static
   * @param {*} ctx
   * @param {*} body
   * @returns {(Promise<IResult | string>)}
   * @memberof MessageService
   */
  public static async postMessage(
    ctx: any,
    body: any
  ): Promise<IResult | string> {
    let message = body
    // 获取ip地址以及物理地理地址
    const ip = (
      ctx.req.headers['x-forwarded-for'] ||
      ctx.req.headers['x-real-ip'] ||
      ctx.req.connection.remoteAddress ||
      ctx.req.socket.remoteAddress ||
      ctx.req.connection.socket.remoteAddress ||
      ctx.req.ip ||
      ctx.req.ips[0]
    ).replace('::ffff:', '')
    message.ip = ip
    message.agent = ctx.headers['user-agent'] || message.agent

    const ip_location = geoip.lookup(ip)

    if (ip_location) {
      ;(message.city = ip_location.city),
        (message.range = ip_location.range),
        (message.country = ip_location.country)
    }

    // 发布评论
    const res = await new Message(message)
      .save()
      .catch(err => ctx.throw(500, err))
    if (res) {
      return {
        ctx,
        result: res,
        message: '留言成功'
      }
    } else {
      const message: string = '留言失败'
      return message
    }
  }

  public static async deleteMessage(
    ctx: any,
    id: string
  ): Promise<IResult | string> {
    const _id = id

    const res = await Message.findByIdAndRemove(_id).catch(err =>
      ctx.throw(500, err)
    )
    if (res) {
      return { ctx, message: '删除留言成功' }
    } else {
      const message: string = '删除留言失败'
      return message
    }
  }

  public static async patchMessage(
    ctx: any,
    id: string,
    body: any
  ): Promise<IResult | string> {
    const _id = id
    let { state } = body

    if (!state) {
      ctx.throw(401, '参数无效')
    }

    const res = await Message.findByIdAndUpdate(_id, { state }).catch(err =>
      ctx.throw(500, err)
    )
    if (res) {
      return { ctx, message: '修改留言状态成功' }
    } else {
      const message: string = '修改留言状态失败'
      return message
    }
  }
}
