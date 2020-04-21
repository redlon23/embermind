const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
	console.log('Setup proxy is called')
	if (process.env.NODE_ENV === 'production') {
		app.use(createProxyMiddleware('/api', { target: 'https://localhost:6000/', changeOrigin: true }))
	} else {
		app.use(createProxyMiddleware('/api', { target: 'http://localhost:6000/', changeOrigin: true }))
	}
}
