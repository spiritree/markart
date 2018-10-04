import { message } from 'antd'
import {
  getCommentList,
  deleteComment,
  changeCommentState
} from '../services/api'

export default {
  namespace: 'comment',

  state: {
    // 模板必须与返回的数据结构保持一致
    data: {
      result: {
        list: [],
        pagination: {}
      }
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getCommentList, payload)
      yield put({
        type: 'getCommentList',
        payload: response
      })
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteComment, payload)
      const list = yield call(getCommentList, payload)
      if (response && response.code === 1) {
        yield put({
          type: 'getCommentList',
          payload: list
        })
        message.success(response.message)
      } else {
        response
          ? message.error(response.message)
          : message.error('认证过期，重新登录')
      }
    },
    *changeState({ payload }, { call, put }) {
      const params = {
        page_size: 10
      }
      const response = yield call(changeCommentState, payload)
      const list = yield call(getCommentList, params)
      if (response && response.code === 1) {
        yield put({
          type: 'getCommentList',
          payload: list
        })
        message.success(response.message)
      } else {
        response
          ? message.error(response.message)
          : message.error('认证过期，重新登录')
      }
    }
  },

  reducers: {
    getCommentList(state, action) {
      return {
        ...state,
        data: action.payload
      }
    }
  }
}
