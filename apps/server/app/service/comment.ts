import Article from '../model/article';
import Comment from '../model/comment';
import Auth from '../utils/auth';
import * as geoip from 'geoip-lite';
import { IResult } from '../utils/messageHandler';

// 更新当前所受影响的文章的评论聚合数据

const updateArticleCommentCount = (post_ids: any[] = []) => {
  post_ids = [...new Set(post_ids)].filter(id => !!id);
  if (post_ids.length) {
    Comment.aggregate([
      { $match: { state: 1, post_id: { $in: post_ids } } },
      { $group: { _id: '$post_id', num_tutorial: { $sum: 1 } } }
    ])
      .then(counts => {
        if (counts.length === 0) {
          Article.update({ id: post_ids[0] }, { $set: { 'meta.comments': 0 } })
            .then(info => {})
            .catch(err => {});
        } else {
          counts.forEach((count: any) => {
            Article.update(
              { id: count._id },
              { $set: { 'meta.comments': count.num_tutorial } }
            )
              .then(info => {
                // console.log('评论聚合更新成功', info);
              })
              .catch(err => {
                // console.warn('评论聚合更新失败', err);
              });
          });
        }
      })
      .catch(err => {
        console.warn('更新评论count聚合数据前，查询失败', err);
      });
  }
};

export class CommentService {
  /**
   * 评论列表
   *
   * @static
   * @param {*} ctx
   * @param {*} queryParams
   * @returns {Promise<IResult | string>}
   * @memberof CommentService
   */
  public static async getCommentList(
    ctx: any,
    queryParams: any
  ): Promise<IResult | string> {
    let {
      sort = -1,
      current_page = 1,
      page_size = 20,
      keyword = '',
      post_id,
      state
    } = queryParams;

    sort = Number(sort);

    // 过滤条件
    const options = {
      sort: { _id: sort },
      page: Number(current_page),
      limit: Number(page_size)
    };

    // 排序字段
    if ([1, -1].includes(sort)) {
      options.sort = { _id: sort };
    } else if (Object.is(sort, 2)) {
      options.sort = { likes: -1 };
    }

    // 查询参数
    let querys: any = {};

    // 查询各种状态
    if (state && ['0', '1', '2'].includes(state)) {
      querys.state = state;
    }

    // 如果是前台请求，则重置公开状态和发布状态
    if (!Auth.authIsVerified(ctx.request)) {
      querys.state = 1;
    }

    // 关键词查询
    if (keyword) {
      const keywordReg = new RegExp(keyword);
      querys['$or'] = [
        { content: keywordReg },
        { 'author.name': keywordReg },
        { 'author.email': keywordReg }
      ];
    }

    // 通过post-id过滤
    if (!Object.is(post_id, undefined)) {
      querys.post_id = post_id;
    }

    // 请求评论
    const comments = await Comment.paginate(querys, options).catch(err =>
      ctx.throw(500, err)
    );
    if (comments) {
      const result = {
        pagination: {
          total: comments.total,
          current_page: options.page,
          total_page: comments.pages,
          per_page: options.limit
        },
        list: comments.docs
      };
      return { ctx, result, message: '获取评论列表成功' };
    } else {
      const message: string = '获取评论列表失败';
      return message;
    }
  }

  /**
   * 发送评论
   *
   * @static
   * @param {*} ctx
   * @param {*} body
   * @returns {Promise<IResult | string>}
   * @memberof CommentService
   */
  public static async postComment(
    ctx: any,
    body: any
  ): Promise<IResult | string> {
    let comment = body;
    // 获取ip地址以及物理地理地址
    const ip = (
      ctx.req.headers['x-forwarded-for'] ||
      ctx.req.headers['x-real-ip'] ||
      ctx.req.connection.remoteAddress ||
      ctx.req.socket.remoteAddress ||
      ctx.req.connection.socket.remoteAddress ||
      ctx.req.ip ||
      ctx.req.ips[0]
    ).replace('::ffff:', '');
    comment.ip = ip;
    comment.agent = ctx.headers['user-agent'] || comment.agent;

    const ip_location = geoip.lookup(ip);

    if (ip_location) {
      (comment.city = ip_location.city),
        (comment.range = ip_location.range),
        (comment.country = ip_location.country);
    }

    comment.likes = 0;
    comment.author = JSON.parse(comment.author);

    if (Number(comment.post_id) !== 0) {
      // 发布评论
      const res = await new Comment(comment)
        .save()
        .catch(err => ctx.throw(500, err));
      if (res) {
        updateArticleCommentCount([res.post_id]);
        return {
          ctx,
          result: res,
          message: '评论发布成功'
        };
      } else {
        const message: string = '发布评论失败';
        return message;
      }
    }
  }

  /**
   *
   *
   * @static
   * @param {*} ctx
   * @param {string} id
   * @returns {(Promise<IResult | string>)}
   * @memberof CommentService
   */
  public static async deleteComment(
    ctx: any,
    id: string
  ): Promise<IResult | string> {
    const _id = id;

    const post_ids = Array.of(Number(ctx.query.post_ids));

    const res = await Comment.findByIdAndRemove(_id).catch(err =>
      ctx.throw(500, err)
    );
    if (res) {
      updateArticleCommentCount(post_ids);
      return { ctx, message: '删除评论成功' };
    } else {
      const message: string = '删除评论失败';
      return message;
    }
  }

  /**
   *
   *
   * @static
   * @param {*} ctx
   * @param {string} id
   * @param {*} body
   * @returns {Promise<IResult | string>}
   * @memberof CommentService
   */
  public static async patchComment(
    ctx: any,
    id: string,
    body: any
  ): Promise<IResult | string> {
    const _id = id;

    let { post_id, state } = body;

    if (!state || !post_id) {
      ctx.throw(401, '参数无效');
    }

    post_id = Array.of(Number(post_id));

    const res = await Comment.findByIdAndUpdate(_id, { state }).catch(err =>
      ctx.throw(500, err)
    );
    if (res) {
      updateArticleCommentCount(post_id);
      return { ctx, message: '修改评论状态成功' };
    } else {
      const message: string = '修改评论状态失败';
      return message;
    }
  }

  public static async likeComment(
    ctx: any,
    body: any
  ): Promise<IResult | string> {
    const { _id, type } = body;

    if (!_id || !type || ![1].includes(Number(type))) {
      const message: string = '无效参数';
      return message;
    }

    const comment = await Comment.findById(_id).catch(err =>
      ctx.throw(500, err)
    );

    if (comment) {
      comment.likes += 1;
      const plusRes = await comment.save().catch((err: any) => ctx.throw(500, err));
      if (plusRes) {
        return { ctx, message: '点赞评论成功' };
      } else {
        const message: string = '点赞评论失败';
        return message;
      }
    } else {
      const message: string = '点赞评论失败';
      return message;
    }
  }
}
