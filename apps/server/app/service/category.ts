import Category from "../model/category";
import Article from "../model/article";
import Auth from "../utils/auth";
import { IResult } from '../utils/messageHandler';

export class CategoryService {
  /**
   *
   *
   * @static
   * @param {*} ctx
   * @param {*} queryParams
   * @returns {Promise<IResult | string>}
   * @memberof CategoryService
   */
  public static async getCategoryList(
    ctx: any,
    queryParams: any
  ): Promise<IResult | string> {
    const { current_page = 1, page_size = 10, keyword = "" } = queryParams;

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

    const category = await Category.paginate(querys, options).catch(err =>
      ctx.throw(500, err)
    );
    if (category) {
      let categoryClone = JSON.parse(JSON.stringify(category));

      // 查找文章中标签聚合
      let $match = {};

      // 前台请求时，只有已经发布的和公开
      if (!Auth.authIsVerified(ctx.request)) $match = { state: 1, publish: 1 };
      const article = await Article.aggregate([
        { $match },
        { $unwind: "$category" },
        {
          $group: {
            _id: "$category",
            num_tutorial: { $sum: 1 }
          }
        }
      ]);
      if (article) {
        categoryClone.docs.forEach((t: any) => {
          const finded: any = article.find(
            (c: any) => String(c._id) === String(t._id)
          );
          t.count = finded ? finded.num_tutorial : 0;
        });
        const result = {
          pagination: {
            total: categoryClone.total,
            current_page: categoryClone.page,
            total_page: categoryClone.pages,
            page_size: categoryClone.limit
          },
          list: categoryClone.docs
        };
        return { ctx, result, message: "获取分类列表成功" };
      } else {
        const message: string = "获取分类列表失败";
        return message;
      }
    } else {
      const message: string = "获取分类列表失败";
      return message;
    }
  }

  /**
   *
   *
   * @static
   * @param {*} ctx
   * @param {*} body
   * @returns {Promise<IResult | string>}
   * @memberof CategoryService
   */
  public static async postCategory(
    ctx: any,
    body: any
  ): Promise<IResult | string> {
    const { name, descript, slug } = body;

    // 添加前，先验证是否有相同 name
    const verifyCategory = await Category.find({ name }).catch(err =>
      ctx.throw(500, err)
    );
    if (verifyCategory && verifyCategory.length !== 0) {
      const message: string = "有相同分类名";
      return message;
    }

    const category = await new Category({ name, descript, slug })
      .save()
      .catch(err => ctx.throw(500, err));
    if (category) {
      return { ctx, message: "新增分类成功", result: category };
    } else {
      const message: string = "新增分类失败";
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
   * @memberof CategoryService
   */
  public static async putCategory(
    ctx: any,
    id: string,
    body: any
  ): Promise<IResult | string> {
    const _id = id;
    const { name, descript, slug } = body;
    if (!_id) {
      const message: string = "无效参数";
      return message;
    }

    const category = await Category.findByIdAndUpdate(
      _id,
      { name, descript, slug },
      { new: true }
    ).catch(err => ctx.throw(500, err));
    if (category) {
      return { ctx, message: "修改分类成功" };
    } else {
      const message: string = "修改分类失败";
      return message;
    }
  }

  /**
   *
   *
   * @static
   * @param {*} ctx
   * @param {string} id
   * @returns {Promise<IResult | string>}
   * @memberof CategoryService
   */
  public static async deleteCategory(
    ctx: any,
    id: string
  ): Promise<IResult | string> {
    const _id = id;

    if (!_id) {
      const message: string = "无效参数";
      return message;
    }

    const category = await Category.findByIdAndRemove(_id).catch(err =>
      ctx.throw(500, err)
    );
    if (category) {
      return { ctx, message: "删除分类成功" };
    } else {
      const message: string = "删除分类失败";
      return message;
    }
  }
}
