const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
	console.log('Setup proxy is called')
	app.use(createProxyMiddleware('/api', { target: 'http://localhost:6000/' }))
}
