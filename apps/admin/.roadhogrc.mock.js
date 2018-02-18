import mockjs from 'mockjs';

import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/(.*)': 'http://localhost:8001/api',
  'POST /api/(.*)': 'http://localhost:8001/api',
  'DELETE /api/(.*)': 'http://localhost:8001/api',
  'PUT /api/(.*)': 'http://localhost:8001/api',
  'PATCH /api/(.*)': 'http://localhost:8001/api',
};

export default noProxy ? {} : delay(proxy, 1000);
