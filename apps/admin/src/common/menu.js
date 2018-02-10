import { isUrl } from '../utils/utils';

const menuData = [{
  name: 'Dashboard',
  icon: 'dashboard',
  path: 'dashboard/analysis',
}, {
  name: '笔记管理',
  icon: 'edit',
  path: 'article',
  children: [{
    name: '笔记列表',
    icon: 'profile',
    path: 'list',
  }, {
    name: '发布笔记',
    icon: 'edit',
    path: 'release',
  }],
}, {
  name: '分类管理',
  icon: 'bars',
  path: 'category',
}, {
  name: '标签管理',
  icon: 'tag',
  path: 'tag',
}, {
  name: '评论管理',
  icon: 'profile',
  path: 'comment',
}, {
  name: '留言墙',
  icon: 'message',
  path: 'message',
}, {
  name: '设置',
  icon: 'setting',
  path: 'option',
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
