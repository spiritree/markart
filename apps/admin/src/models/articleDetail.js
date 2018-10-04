import { message } from 'antd'
import { getArticleDetail } from '../services/api'

export default {
  namespace: 'articleDetail',

  state: {
    // 模板必须与返回的数据结构保持一致
    data: {
      result: {}
    }
  },

  effects: {
    *edit({ payload }, { call, put }) {
      const response = yield call(getArticleDetail, payload)
      if (response && response.code === 1) {
        yield put({
          type: 'getDetail',
          payload: response
        })
      } else {
        response
          ? message.error(response.message)
          : message.error('认证过期，重新登录')
      }
    }
  },
  reducers: {
    getDetail(state, action) {
      return {
        ...state,
        data: action.payload
      }
    }
  }
}
