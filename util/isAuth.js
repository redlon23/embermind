// module.exports = (req, res, next) => {
// 	console.log('your Sess' + req.session)
// 	if (!req.session.userId) return res.redirect('/')

// 	next()
// }

exports.isAuthenticated = (req, res) => {
	console.log('your Sess' + JSON.stringify(req.session))
	res.send(req.session)
}
