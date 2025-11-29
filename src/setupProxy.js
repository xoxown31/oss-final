
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://openapi.naver.com/v1',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('X-Naver-Client-Id', process.env.REACT_APP_NAVER_CLIENT_ID);
        proxyReq.setHeader('X-Naver-Client-Secret', process.env.REACT_APP_NAVER_CLIENT_SECRET);
      },
    })
  );
};
