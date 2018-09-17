const argv = require('yargs').argv

export const MONGODB = {
  uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/nodeblog`,
  username: argv.db_username || 'DB_username',
  password: argv.db_password || 'DB_password'
}

export const QINIU = {
	accessKey: argv.qn_accessKey || 'your_qqn_accessKey',
	secretKey: argv.qn_secretKey || 'your_qn_secretKey',
	bucket: argv.qn_bucket || 'your_qn_bucket',
	origin: argv.qn_origin || 'http://blog.u.qiniudn.com',
	uploadURL: argv.qn_uploadURL || 'http://up.qiniu.com/'
}

export const AUTH = {
  jwtTokenSecret: argv.auth_key || 'nodeblog',
  defaultUsername: argv.auth_default_username || 'spiritree',
  defaultPassword: argv.auth_default_password || '123456'
}

export const APP = {
  ROOT_PATH: '/api',
  LIMIT: 16,
  PORT: 8001
}

export const INFO = {
  name: 'spiritree_blog',
  version: '1.0.0',
  author: 'spiritree',
  site: '',
  powered: ['Vue2', 'Nuxt.js', 'Node.js', 'MongoDB', 'koa', 'Nginx']
}
