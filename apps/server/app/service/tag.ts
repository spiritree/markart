import Tag from "../model/tag";
import Article from "../model/article";
import Auth from "../utils/auth";
import { IResult } from '../utils/messageHandler';

export class TagService {
  /**
   * 获取标签列表
   *
   * @static
   * @param {*} ctx
   * @param {*} queryParams
   * @returns {Promise<IResult | string>}
   * @memberof TagService
   */
  public static async getTagList(ctx: any, queryParams: any): Promise<IResult | string> {
    const { current_page = 1, page_size = 18, keyword = "" } = queryParams;

    // 过滤条件
    const options = {
      sort: { sort: 1 },
      page: Number(current_page),
      limit: Number(page_size)
    };

    // 参数
    const querys = {
      name: new RegExp(keyword)
    };

    const tag = await Tag.paginate(querys, options).catch(err =>
      ctx.throw(500, err)
    );
    if (tag) {
      let tagClone = JSON.parse(JSON.stringify(tag));

      // 查找文章中标签聚合
      let $match = {};

      // 前台请求时，只有已经发布的和公开
      if (!Auth.authIsVerified(ctx.request)) $match = { state: 1, publish: 1 };
      const article = await Article.aggregate([
        { $match },
        { $unwind: "$tag" },
        {
          $group: {
            _id: "$tag",
            num_tutorial: { $sum: 1 }
          }
        }
      ]);
      if (article) {
        tagClone.docs.forEach((t: any) => {
          const finded: any = article.find(
            (c: any) => String(c._id) === String(t._id)
          );
          t.count = finded ? finded.num_tutorial : 0;
        });
        const result = {
          pagination: {
            total: tagClone.total,
            current_page: tagClone.page,
            total_page: tagClone.pages,
            page_size: tagClone.limit
          },
          list: tagClone.docs
        };
        return { ctx, result, message: "获取标签列表成功" };
      } else {
        const message = "获取标签列表失败";
        return message;
      }
    } else {
      const message = "获取标签列表失败";
      return message;
    }
  }

  /**
   * 添加标签
   * 
   * @static
   * @param {*} ctx 
   * @param {*} body 
   * @returns {(Promise<IResult | string>)} 
   * @memberof TagService
   */
  public static async postTag(ctx: any, body: any): Promise<IResult | string> {
    const { name, descript } = body;

    // 添加前，先验证是否有相同 name
    const verifyTag = await Tag.find({ name }).catch(err =>
      ctx.throw(500, err)
    );
    if (verifyTag && verifyTag.length !== 0) {
      const message = "有相同标签名";
      return message;
    }

    const tag = await new Tag({ name, descript })
      .save()
      .catch(err => ctx.throw(500, err));
    if (tag) {
      return { ctx, message: "新增标签成功", result: tag };
    } else {
      const message = "新增标签失败";
      return message;
    }
  }

  /**
   * 排序标签
   *
   * @static
   * @param {*} ctx
   * @param {*} body
   * @returns {Promise<IResult | string>}
   * @memberof TagService
   */
  public static async sortTag(ctx: any, body: any): Promise<IResult | string> {
    const { ids } = body;

    try {
      let i = 0;
      for (; i < ids.length; i++) {
        await Tag.findByIdAndUpdate(ids[i], { sort: i + 1 }).catch(err =>
          ctx.throw(500, err)
        );
      }
      return { ctx, message: "排序成功" };
    } catch (err) {
      console.log(err);
      const message = "排序失败";
      return message;
    }
  }

  /**
   * 修改标签
   *
   * @static
   * @param {*} ctx
   * @param {*} id
   * @param {*} body
   * @returns {Promise<IResult | string>}
   * @memberof TagService
   */
  public static async putTag(ctx: any, id: string, body: any): Promise<IResult | string> {
    const _id = id;
    const { name, descript } = body;
    if (!_id) {
      const message = "无效参数";
      return message;
    }

    const tag = await Tag.findByIdAndUpdate(
      _id,
      { name, descript },
      { new: true }
    ).catch(err => ctx.throw(500, err));
    if (tag) {
      return { ctx, message: "修改标签成功" };
    } else {
      const message = "修改标签失败";
      return message;
    }
  }

  /**
   * 删除标签
   *
   * @static
   * @param {*} ctx
   * @param {*} id
   * @returns {Promise<IResult | string>}
   * @memberof TagService
   */
  public static async deleteTag(ctx: any, id: string): Promise<IResult | string> {
    const _id = id;

    if (!_id) {
      const message = "无效参数";
      return message;
    }

    const tag = await Tag.findByIdAndRemove(_id).catch(err =>
      ctx.throw(500, err)
    );
    if (tag) {
      return { ctx, message: "删除标签成功" };
    } else {
      const message = "删除标签失败";
      return message;
    }
  }
}
