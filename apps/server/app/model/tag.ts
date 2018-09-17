import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { Schema } from 'mongoose'
const autoIncrement = require('mongoose-auto-increment-fix')

// 自增ID初始化
autoIncrement.initialize(mongoose.connection)

interface ITagModel extends mongoose.Document {
  name: string
  descript: string
  create_at: Date
  update_at: Date
  sort: number
}

// 标签模型
const tagSchema: Schema = new mongoose.Schema({
  // 标签名称
  name: { type: String, required: true, validate: /\S+/ },

  // 标签描述
  descript: String,

  // 发布日期
  create_at: { type: Date, default: Date.now },

  // 最后修改日期
  update_at: { type: Date },

  // 排序
  sort: { type: Number, default: 0 }
})

// 翻页
tagSchema.plugin(mongoosePaginate)
tagSchema.plugin(autoIncrement.plugin, {
  model: 'Tag',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

// 时间更新
tagSchema.pre('findOneAndUpdate', function(next) {
  this.findOneAndUpdate({}, { update_at: Date.now() })
  next()
})

// 标签模型
export default mongoose.model<ITagModel>('Tag', tagSchema)
