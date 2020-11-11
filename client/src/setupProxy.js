const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:5000', //client 3000포트에서 요청할 때 타겟을 5000번으로 하겠다
			changeOrigin: true,
		})
	);
};