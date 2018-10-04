import { getArticleList, getCategoryList, getTagList } from '../services/api'

export default {
  namespace: 'chart',

  state: {
    // 模板必须与返回的数据结构保持一致
    data: {}
  },

  effects: {
    *fetchArticle(_, { call, put }) {
      const response = yield call(getArticleList)
      yield put({
        type: 'save',
        payload: response
      })
      return response
    },
    *fetchTag(_, { call, put }) {
      const response = yield call(getTagList)
      yield put({
        type: 'save',
        payload: response
      })
      return response
    },
    *fetchCategory(_, { call, put }) {
      const response = yield call(getCategoryList)
      yield put({
        type: 'save',
        payload: response
      })
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: {
          category: action.payload,
          tag: state.data.chart,
          article: state.data.chart
        }
      }
    },
    clear() {
      return {
        state: {
          // 模板必须与返回的数据结构保持一致
          data: {}
        }
      }
    }
  }
}
