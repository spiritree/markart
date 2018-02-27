export const state = () => {
  return {
    fetching: false,
    posting: false,
    data: {
      data: [],
      pagination: {}
    }
  };
};

export const mutations = {
  // 获取评论
  REQUEST_LIST(state) {
    state.fetching = true;
  },

  // 清空评论
  CLEAR_LIST(state) {
    state.data = {
      data: [],
      pagination: {}
    };
  },
  GET_LIST_SUCCESS(state, action) {
    state.fetching = false;
    state.data = action;
  },

  GET_LIST_FAILURE(state) {
    state.fetching = false;
    state.data = {
      data: [],
      pagination: {}
    };
  }
};
