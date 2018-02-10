import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getArticleList, deleteArticle, changeArticleStatus, postArticle, updateArticle } from '../services/api';

export default {
  namespace: 'article',

  state: {
    // 模板必须与返回的数据结构保持一致
    data: {
      result: {
        list: [],
        pagination: {},
      },
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getArticleList, payload);
      yield put({
        type: 'getArticleList',
        payload: response,
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteArticle, payload);
      const list = yield call(getArticleList, payload);
      if (response.code === 1) {
        yield put({
          type: 'getArticleList',
          payload: list,
        });
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
    *changePublish({ payload }, { call, put }) {
      const params = {
        page_size: 10,
      };
      const response = yield call(changeArticleStatus, payload);
      const list = yield call(getArticleList, params);
      if (response.code === 1) {
        yield put({
          type: 'refreshPublish',
          payload: list,
        });
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
    *changeState({ payload }, { call, put }) {
      const params = {
        page_size: 10,
      };
      const response = yield call(changeArticleStatus, payload);
      const list = yield call(getArticleList, params);
      if (response.code === 1) {
        yield put({
          type: 'refreshState',
          payload: list,
        });
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
    *submit({ payload }, { call, put }) {
      const response = yield call(postArticle, payload);
      if (response.code === 1) {
        message.success(response.message);
        yield put(routerRedux.push('/article/list'));
      } else {
        message.error(response.message);
      }
    },
    *patch({ payload }, { call, put }) {
      const response = yield call(updateArticle, payload);
      if (response.code === 1) {
        message.success(response.message);
        yield put(routerRedux.push('/article/list'));
      } else {
        message.error(response.message);
      }
    },
  },
  reducers: {
    getArticleList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    // 不能共用一个状态否则无法更新
    refreshPublish(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    refreshState(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  // subscriptions: {
  //   setup({ history, dispatch }) {
  //     // 监听 history 变化，当进入 `/` 时触发 `load` action
  //     return history.listen(({ pathname }) => {
  //       if (pathname === '/article/list') {
  //         dispatch({ type: 'fetch' });
  //       }
  //     });
  //   },
  // },
};
