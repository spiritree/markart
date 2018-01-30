import Article from '../model/article';
import Auth from '../utils/auth';

export class ArticleService {
  /**
   * 获取文章列表
   * @static
   * @param {*} body
   * @param {*} queryParams
   * @returns {Promise<Object>} ctx?, result?, message
   * @memberof ArticleService
   */

  public static async getArticleList(ctx: any, queryParams: any): Promise<any> {
    const {
      current_page = 1,
      page_size = 10,
      keyword = "",
      state = 1,
      publish = 1,
      tag,
      type,
      date
    } = queryParams;

    // 过滤条件
    const options = {
      sort: { create_at: -1 },
      page: Number(current_page),
      limit: Number(page_size),
      populate: ["tag"],
      select: "-content"
    };

    // 参数
    const querys: any = {};

    // 关键词查询
    if (keyword) {
      const keywordReg = new RegExp(keyword);
      querys["$or"] = [
        { title: keywordReg },
        { content: keywordReg },
        { description: keywordReg }
      ];
    }

    // 按照state查询
    if (["1", "2"].includes(state)) {
      querys.state = state;
    }

    // 按照公开程度查询
    if (["1", "2"].includes(publish)) {
      querys.publish = publish;
    }

    // 按照类型程度查询
    if (["1", "2", "3"].includes(type)) {
      querys.type = type;
    }

    // 按热度排行
    // if (hot) {
    //   options.sort = {
    //     'meta.views': -1,
    //     'meta.likes': -1,
    //     'meta.comments': -1
    //   }
    // }

    // 时间查询
    if (date) {
      const getDate: any = new Date(date);
      if (!Object.is(getDate.toString(), "Invalid Date")) {
        querys.create_at = {
          $gte: new Date((getDate / 1000 - 60 * 60 * 8) * 1000),
          $lt: new Date((getDate / 1000 + 60 * 60 * 16) * 1000)
        };
      }
    }

    if (tag) {
      querys.tag = tag;
    }

    // 如果是前台请求，则重置公开状态和发布状态
    // if (!Auth.authIsVerified(ctx.request)) {
    //   querys.state = 1;
    //   querys.publish = 1;
    // }

    // 查询
    const article = await Article.paginate(querys, options).catch((err: any) =>
      ctx.throw(500, err)
    );
    if (article) {
      const result = {
        pagination: {
          total: article.total,
          current_page: article.page,
          total_page: article.pages,
          page_size: article.limit
        },
        list: article.docs
      };
      return {ctx, result, message: "列表数据获取成功" };
    } else {
      const message: string = "获取列表数据失败";
      return message;
    }
  }

  /**
   * 
   * @static
   * @param {*} ctx
   * @param {*} body
   * @returns {ctx?, message}
   * @memberof ArticleService
   */
  public static async postArticle(ctx: any, body: any): Promise<any> {
    const article = new Article(body)
      .save()
      .catch((err: any) => ctx.throw(500, err));

    if (article) {
      return { ctx, message: "添加文章成功" };
    } else {
      const message = "添加文章失败";
      return message;
    }
  }

  /**
   * 
   * @static
   * @param {*}  ctx
   * @param {*} id
   * @returns {ctx?, message}
   * @memberof ArticleService
   */
  public static async getArticleDetail(ctx: any, id: any): Promise<any> {
    const _id = id;

    if (!_id) {
      const message: string = "无效参数";
      return message;
    }

    const article = await Article.findById(_id)
      .populate("tag")
      .catch((err: any) => ctx.throw(500, err));
    if (article) {
      // 每次请求，views 都增加一次
      article.meta.views += 1;
      article.save();
      return { ctx, message: "文章获取成功", result: article };
    } else {
      const message: string = "文章获取失败";
      return message;
    }
  }

  /**
   * 
   * @static
   * @param {*} ctx
   * @param {*} id
   * @returns {ctx?, message}
   * @memberof ArticleService
   */
  public static async deleteArticle(ctx: any, id: any): Promise<any> {
    const _id = id;

    if (!_id) {
      const message: string = "无效参数";
      return message;
    }

    const res = await Article.findByIdAndRemove(_id).catch((err: any) =>
      ctx.throw(500, err)
    );
    if (res) {
      return { ctx, message: "删除文章成功" };
    } else {
      const message: string = "文章删除失败";
      return message;
    }
  }

  /**
   * 
   * @static
   * @param {*} ctx
   * @param {*} id
   * @param {*} body
   * @returns {ctx?, message}
   * @memberof ArticleService
   */
  public static async putArticle(ctx: any, id: any, body: any): Promise<any> {
    const _id = id;

    const { title, keyword } = body;

    delete body.create_at;
    delete body.update_at;
    delete body.meta;

    if (!_id) {
      const message: string = "无效参数";
      return message;
    }

    if (!title || !keyword) {
      const message: string = "title, keyword必填";
      return message;
    }

    const article = await Article.findByIdAndUpdate(
      _id,
      body
    ).catch((err: any) => ctx.throw(500, err));
    if (article) {
      return { ctx, message: "更新文章成功" };
    } else {
      const message: string = "更新文章失败";
      return message;
    }
  }

  /**
   * 修改文章状态
   * @static
   * @param {*} ctx
   * @param {*} id
   * @param {*} body
   * @returns {ctx?, message}
   * @memberof ArticleService
   */
  public static async patchArticle(ctx: any, id: any, body: any): Promise<any> {
    const _id = id;
    console.log('patchart', _id)
    const { state, publish } = body;
    const querys: any = {};

    if (state) querys.state = state;

    if (publish) querys.publish = Number(publish);
    if (!_id) {
      const message: string = "无效参数";
      return message;
    }

    const article = await Article.findByIdAndUpdate(_id, querys).catch(
      (err: any) => ctx.throw(500, err)
    );
    
    if (article) {
      return { ctx, message: "更新文章状态成功" };
    } else {
      const message: string = "更新文章状态失败";
      return message;
    }
  }

  /**
   * 
   * @static
   * @param {*} ctx
   * @returns {ctx?, result?, message}
   * @memberof ArticleService
   */
  public static async getAllArticle(ctx: any): Promise<any> {
    // const current_page = 1
    // const page_size = 10000

    // 过滤条件
    // const options = {
    //   sort: { create_at: -1 },
    //   page: Number(current_page),
    //   limit: Number(page_size),
    //   populate: ['tag'],
    //   select: '-content'
    // }

    // 参数
    // const querys = {
    //   state: 1,
    //   publish: 1
    // }

    // 查询
    const article = await Article.aggregate([
      { $match: { state: 1, publish: 1 } },
      {
        $project: {
          year: { $year: "$create_at" },
          month: { $month: "$create_at" },
          title: 1,
          create_at: 1
        }
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month"
          },
          article: {
            $push: {
              title: "$title",
              _id: "$_id",
              create_at: "$create_at"
            }
          }
        }
      }
    ]);
    if (article) {
      let yearList: Array<Object> = [
        ...new Set(article.map((item: any) => item._id.year))
      ].map(item => {
        let monthList: Array<Object> = [];
        article.forEach((n: any) => {
          // 同一年
          if (n._id.year === item) {
            monthList.push({
              month: n._id.month,
              articleList: n.article.reverse()
            });
          }
        });
        return { year: item, monthList };
      });

      return { ctx, result: yearList, message: "获取内容成功" };
    } else {
      const message = "获取内容失败";
      return message;
    }
  }
}
