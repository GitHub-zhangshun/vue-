/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址。
 * routerMode: 路由模式。
 * credential: 跨域请求时是否需要使用凭证。
 */
const dev = {
  // or history
  routerMode: 'history',
  /* beta */
  // 自定义反向代理
  baseUrl: `${location.origin}`,
  // baseUrl: ``,
  credential: false
};

const prod = {
  ...dev
};

export default process.env.NODE_ENV === "development" ? dev : prod;
