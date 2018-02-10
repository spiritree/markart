import { message } from 'antd';
import { getMessageList, deleteMessage, changeMessageState } from '../services/api';

export default {
  namespace: 'message',

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
      const response = yield call(getMessageList, payload);
      yield put({
        type: 'getMessageList',
        payload: response,
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteMessage, payload);
      const list = yield call(getMessageList, payload);
      if (response.code === 1) {
        yield put({
          type: 'getMessageList',
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
      const response = yield call(changeMessageState, payload);
      const list = yield call(getMessageList, params);
      if (response.code === 1) {
        yield put({
          type: 'getMessageList',
          payload: list,
        });
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    getMessageList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
