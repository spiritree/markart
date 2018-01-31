# koa-typescript-blog

## Project structure
```bash
├── app
│   ├── controller 控制层
│   ├── lib 插件
│   ├── middleware 中间件
│   ├── model 数据层
│   ├── route.ts 路由
│   ├── service 业务层
│   └── utils 工具类
├── app.ts 启动类
├── config
│   └── index.ts 默认配置
├── package-lock.json
├── package.json 依赖
├── tsconfig.json TypeScript配置
└── tslint.json TypeScript语法规则
```

## Development

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8001
npm run dev

# complie TypeScript to JavaScript
npm run tsc

# clean *.js
npm run clean
```