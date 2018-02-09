const argv = require("yargs").argv;

export const MONGODB = {
  uri: `mongodb://127.0.0.1:${argv.dbport || "27017"}/nodeblog`,
  username: argv.db_username || "DB_username",
  password: argv.db_password || "DB_password"
};

// exports.QINIU = {
// 	accessKey: argv.qn_accessKey || 'your_qqn_accessKey',
// 	secretKey: argv.qn_secretKey || 'your_qn_secretKey',
// 	bucket: argv.qn_bucket || 'your_qn_bucket',
// 	origin: argv.qn_origin || 'http://blog.u.qiniudn.com',
// 	uploadURL: argv.qn_uploadURL || 'http://up.qiniu.com/'
// }

export const AUTH = {
  jwtTokenSecret: argv.auth_key || "nodeblog",
  defaultUsername: argv.auth_default_username || "spiritree",
  defaultPassword: argv.auth_default_password || "123456"
};

// exports.EMAIL = {
// 	account: argv.EMAIL_account || 'your_EMAIL_account',
// 	password: argv.EMAIL_password || 'your_EMAIL_password'
// }

// exports.BAIDU = {
// 	site: argv.baidu_site || 'your_baidu_site',
// 	token: argv.baidu_token || 'your_baidu_token'
// }

export const APP = {
  ROOT_PATH: "/api",
  LIMIT: 16,
  PORT: 8001
};

export const INFO = {
  name: "spiritree_blog",
  version: "1.0.0",
  author: "spiritree",
  site: "",
  powered: ["Vue2", "Nuxt.js", "Node.js", "MongoDB", "koa", "Nginx"]
};
