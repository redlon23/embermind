const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
	console.log('Setup proxy is called')
	app.use(createProxyMiddleware('/api', { target: 'https://localhost:6000/', changeOrigin: true }))
}
