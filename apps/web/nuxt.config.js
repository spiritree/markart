module.exports =  {
  mode: 'universal',
  // cache: true,
  cache: {
    max: 1000,
    maxAge: 900000
  },
  build: {
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')()
    ],
    // babel
  },
  dev: process.env.NODE_ENV !== 'production',
  /*
  ** Headers of the page
  */
  head: {
    title: '记载人生路上的笔记',
    titleTemplate: '%s | spiritree',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: '记载人生路上的笔记。'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '前端开发，JavaScript, Node, Vue，nuxt'
      },
      { name: 'author', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }]
  },
  // plugins
  plugins: [
    { src: '~/plugins/marked.js' },
    { src: '~/plugins/highlight.js' },
    { src: '~/plugins/gravatar.js' },
    { src: '~/plugins/clickOutside.js', ssr: false },
    { src: '~/plugins/baidu-seo-push.js', ssr: false },
    { src: '~/plugins/filter.js' },
    { src: '~/plugins/finally.js' }
  ],

  // router
  router: {
    middleware: ['layout'],
    linkActiveClass: 'link-active'
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/scss/index.scss', lang: 'scss' },
    'highlight.js/styles/atom-one-light.css'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#9b4dca' }
};
