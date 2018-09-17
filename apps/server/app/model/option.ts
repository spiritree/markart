import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

interface Meta {
  likes: number
}

interface IOptionModel extends mongoose.Document {
  title: string
  sub_title: string
  keyword: string
  descript: string
  url: string
  email: string
  icp: string
  meta: Meta
}

const optionSchema: Schema = new mongoose.Schema({
  // 网站标题
  title: { type: String, required: true },

  // 网站副标题
  sub_title: { type: String, required: true },

  // 关键字
  keyword: { type: String },

  // 网站描述
  descript: String,

  // 站点地址
  url: { type: String, required: true },

  // 网站官邮
  email: String,

  // 备案号
  icp: String,

  // 搜索引擎ping
  // ping_sites: [{ type: String, validate: /\S+/ }],

  // 其他元信息
  meta: {
    // 被喜欢次数
    likes: { type: Number, default: 0 }
  }
})

export default mongoose.model<IOptionModel>('Option', optionSchema)
