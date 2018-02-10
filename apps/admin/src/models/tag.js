import { message } from 'antd';
import { getTagList, addTag, deleteTag, updateTag } from '../services/api';

export default {
  namespace: 'tag',

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
      const response = yield call(getTagList, payload);
      yield put({
        type: 'getTagList',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addTag, payload);
      const list = yield call(getTagList, payload);
      if (response.code === 1) {
        yield put({
          type: 'getTagList',
          payload: list,
        });
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteTag, payload);
      const list = yield call(getTagList, payload);
      if (response.code === 1) {
        yield put({
          type: 'getTagList',
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
      const response = yield call(updateTag, payload);
      const list = yield call(getTagList, params);
      if (response.code === 1) {
        yield put({
          type: 'getTagList',
          payload: list,
        });
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    getTagList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
