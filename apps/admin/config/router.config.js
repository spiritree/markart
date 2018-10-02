export default [
  // user
  {
    path: 'user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' }
    ]
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/dashboard/analysis'
      },
      {
        path: '/dashboard/analysis',
        name: 'Dashboard',
        icon: 'dashboard',
        component: './Dashboard/Analysis'
      },
      {
        path: '/article',
        name: '文章管理',
        icon: 'edit',
        routes: [
          {
            path: '/article/list',
            name: '文章列表',
            component: './Article/List'
          },
          {
            path: '/article/release',
            name: '发布笔记',
            component: './Article/Release'
          },
          {
            path: '/article/release/:id',
            component: './Article/Release'
          }
        ]
      },
      {
        path: '/category',
        name: '分类管理',
        icon: 'bars',
        component: './Category/Category'
      },
      {
        path: '/tag',
        name: '标签管理',
        icon: 'tag',
        component: './Tag/Tag'
      },
      {
        path: '/comment',
        name: '评论管理',
        icon: 'profile',
        component: './Comment/Comment'
      },
      {
        path: '/message',
        name: '留言墙',
        icon: 'message',
        component: './Message/Message'
      },
      {
        path: '/option',
        name: '设置',
        icon: 'setting',
        component: './Option/Option'
      },
      {
        component: '404'
      }
    ]
  }
]
