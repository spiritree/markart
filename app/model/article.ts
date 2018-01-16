import * as mongoose from "mongoose";
import * as mongoosePaginate from "mongoose-paginate";
import { Schema } from "mongoose";
const autoIncrement = require("mongoose-auto-increment-fix");

// 自增ID初始化
autoIncrement.initialize(mongoose.connection);

interface ArticleModel extends mongoose.Document {
  title: string;
  keyword: string;
  descript: string;
  category: any;
  tag: any;
  content: string;
  state: number;
  publish: number;
  thumb: string;
  create_at: Date;
  update_at: Date;
  meta: any;
  extends: any;
}

const articleSchema: Schema = new mongoose.Schema({
  // 文章标题
  title: { type: String, required: true },

  // 关键字
  keyword: { type: String, required: true },

  // 描述
  descript: { type: String, required: true },

  // 文章分类
  category: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
  ],

  // 标签
  tag: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

  // 内容
  content: { type: String, required: true },

  // 状态 1 发布 2 草稿
  state: { type: Number, default: 1 },

  // 文章公开状态 1 公开 2 私密
  publish: { type: Number, default: 1 },

  // 缩略图
  thumb: String,

  // 发布日期
  create_at: { type: Date, default: Date.now },

  // 最后修改日期
  update_at: { type: Date, default: Date.now },

  // 其他元信息
  meta: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  },

  // 自定义扩展
  extends: [
    {
      name: { type: String, validate: /\S+/ },
      value: { type: String, validate: /\S+/ }
    }
  ]
});

// 转化成普通 JavaScript 对象
articleSchema.set("toObject", { getters: true });

// 翻页 + 自增ID插件配置
articleSchema.plugin(mongoosePaginate);
articleSchema.plugin(autoIncrement.plugin, {
  model: "Article",
  field: "id",
  startAt: 1,
  incrementBy: 1
});

// 时间更新
articleSchema.pre("findOneAndUpdate", next => {
  this.findOneAndUpdate({}, { update_at: Date.now() });
  next();
});

// 列表时用的文章内容虚拟属性
articleSchema.virtual("t_content").get(() => {
  const content = this.content;
  return !!content ? content.substring(0, 130) : content;
});

export default mongoose.model<ArticleModel>("Article", articleSchema);
