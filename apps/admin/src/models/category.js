import { message } from 'antd';
import { getCategoryList, addCategory, deleteCategory, updateCategory } from '../services/api';

export default {
  namespace: 'category',

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
      const response = yield call(getCategoryList, payload);
      yield put({
        type: 'getCategoryList',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addCategory, payload);
      const list = yield call(getCategoryList, payload);
      if (response.code === 1) {
        yield put({
          type: 'getCategoryList',
          payload: list,
        });
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteCategory, payload);
      const list = yield call(getCategoryList, payload);
      if (response.code === 1) {
        yield put({
          type: 'getCategoryList',
          payload: list,
        });
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
    *update({ payload }, { call, put }) {
      const params = {
        page_size: 10,
      };
      const response = yield call(updateCategory, payload);
      const list = yield call(getCategoryList, params);
      if (response.code === 1) {
        yield put({
          type: 'getCategoryList',
          payload: list,
        });
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    getCategoryList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
