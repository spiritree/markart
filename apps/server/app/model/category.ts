import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { Schema } from 'mongoose'
const autoIncrement = require('mongoose-auto-increment-fix')

// 自增ID初始化
autoIncrement.initialize(mongoose.connection)

interface Extend {
  name: string
  value: string
}

interface ICategoryModel extends mongoose.Document {
  name: string
  slug: string
  descript: string
  pid: any
  create_at: Date
  update_at: Date
  extend: Extend[]
}

const categorySchema: Schema = new mongoose.Schema({
  // 分类名称
  name: { type: String, required: true, validate: /\S+/ },

  // 别名
  slug: { type: String, required: true, validate: /\S+/ },

  // 分类描述
  descript: { type: String },

  // 父分类ID
  pid: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },

  // 创建时间
  create_at: { type: Date, default: Date.now },

  // 最后修改日期
  update_at: { type: Date },

  // 自定义扩展
  extends: [
    {
      name: { type: String, validate: /\S+/ },
      value: { type: String, validate: /\S+/ }
    }
  ]
})

// 转化成普通 JavaScript 对象
categorySchema.set('toObject', { getters: true })

// 翻页 + 自增ID插件配置
categorySchema.plugin(mongoosePaginate)
categorySchema.plugin(autoIncrement.plugin, {
  model: 'Category',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

// 时间更新
categorySchema.pre('findOneAndUpdate', function(next) {
  this.findOneAndUpdate({}, { update_at: Date.now() })
  next()
})

export default mongoose.model<ICategoryModel>('Category', categorySchema)
