import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { Schema } from 'mongoose'
const autoIncrement = require('mongoose-auto-increment-fix')

// 自增ID初始化
autoIncrement.initialize(mongoose.connection)

interface IMessageModel extends mongoose.Document {
  name: string
  content: string
  state: number
  ip: string
  city: string
  range: string
  country: string
  agent: string
  create_at: Date
}

const messageSchema: Schema = new mongoose.Schema({
  // 名称
  name: { type: String },

  // 内容
  content: { type: String, required: true, validate: /\S+/ },

  // 状态  0 待审核，1 审核通过， 2 审核不通过
  state: { type: Number, default: 0 },

  // ip
  ip: { type: String },

  // ip 物理地址
  city: { type: String },
  range: { type: String },
  country: { type: String },

  // 用户ua
  agent: { type: String, validate: /\S+/ },

  // 发布日期
  create_at: { type: Date, default: Date.now }
})

messageSchema.plugin(mongoosePaginate)
messageSchema.plugin(autoIncrement.plugin, {
  model: 'Message',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

export default mongoose.model<IMessageModel>('Message', messageSchema)
