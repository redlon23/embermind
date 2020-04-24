module.exports = (req, res, next) => {
	console.log('your Sess' + req.session)
	if (!req.session.userId) return res.redirect('/')

	next()
}
