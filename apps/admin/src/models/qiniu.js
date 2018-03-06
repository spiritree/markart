import { message } from 'antd';
import { getQiniuToken } from '../services/api';

export default {
  namespace: 'qiniu',

  state: {
    // 模板必须与返回的数据结构保持一致
    data: {
      result: {
      },
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getQiniuToken, payload);
      if (response.code === 1) {
        yield put({
          type: 'getToken',
          payload: response,
        });
      } else {
        message.error(response.message);
      }
    },
  },
  reducers: {
    getToken(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
