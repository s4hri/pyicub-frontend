const PROXY = process.env.REACT_APP_PROXY
const API 	= process.env.REACT_APP_API

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  	app.use(
		`/${API}`,
  	  	createProxyMiddleware({
  	  	  	target: `${PROXY}`,
  	  	  	changeOrigin: true,
  	  	})
  	)
}
