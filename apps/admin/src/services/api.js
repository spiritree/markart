import { stringify } from 'qs';
import request from '../utils/request';

const baseURL = `http://localhost:8001`

export async function authLogin(params) {
  return request(`${baseURL}/api/auth/login`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getArticleList(params) {
  return request(`${baseURL}/api/article?${stringify(params)}`);
}

export async function deleteArticle(params) {
  return request(`${baseURL}/api/article/${params}`, {
    method: 'DELETE',
  });
}

export async function changeArticleStatus(params) {
  const { _id, publish, state } = params;
  if (publish) {
    return request(`${baseURL}/api/article/${_id}`, {
      method: 'PATCH',
      body: {
        publish,
      },
    });
  }
  if (state) {
    return request(`${baseURL}/api/article/${_id}`, {
      method: 'PATCH',
      body: {
        state,
      },
    });
  }
}

export async function postArticle(params) {
  return request(`${baseURL}/api/article`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateArticle(params) {
  const { _id } = params;
  return request(`${baseURL}/api/article/${_id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function getArticleDetail(params) {
  return request(`${baseURL}/api/article/${params}`);
}

export async function getTagList(params) {
  return request(`${baseURL}/api/tag?${stringify(params)}`);
}

export async function addTag(params) {
  return request(`${baseURL}/api/tag`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function deleteTag(params) {
  return request(`${baseURL}/api/tag/${params}`, {
    method: 'DELETE',
  });
}

export async function updateTag(params) {
  const { _id } = params;
  return request(`${baseURL}/api/tag/${_id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function getCommentList(params) {
  return request(`${baseURL}/api/comment?${stringify(params)}`);
}

export async function deleteComment(params) {
  return request(`${baseURL}/api/comment/${params}`, {
    method: 'DELETE',
  });
}

export async function changeCommentState(params) {
  const { _id, state, post_id } = params;
  return request(`${baseURL}/api/comment/${_id}`, {
    method: 'PATCH',
    body: {
      state,
      post_id,
    },
  });
}

export async function getCategoryList(params) {
  return request(`${baseURL}/api/category?${stringify(params)}`);
}

export async function addCategory(params) {
  return request(`${baseURL}/api/category`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function deleteCategory(params) {
  return request(`${baseURL}/api/category/${params}`, {
    method: 'DELETE',
  });
}

export async function updateCategory(params) {
  const { _id } = params;
  return request(`${baseURL}/api/category/${_id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function getMessageList(params) {
  return request(`${baseURL}/api/message?${stringify(params)}`);
}

export async function deleteMessage(params) {
  return request(`${baseURL}/api/message/${params}`, {
    method: 'DELETE',
  });
}

export async function changeMessageState(params) {
  const { _id, state } = params;
  return request(`${baseURL}/api/message/${_id}`, {
    method: 'PATCH',
    body: {
      state,
    },
  });
}

export async function getOption(params) {
  return request(`${baseURL}/api/option?${stringify(params)}`);
}

export async function updateOption(params) {
  let _id = '';
  if (params._id) {
    _id = { params };
  }
  return request(`${baseURL}/api/option/${_id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function getAuth(params) {
  return request(`${baseURL}/api/auth?${stringify(params)}`);
}

export async function updateAuth(params) {
  return request(`${baseURL}/api/auth`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
