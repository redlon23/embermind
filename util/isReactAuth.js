exports.isReactAuthenticated = (req, res) => {
	console.log('your Sess' + JSON.stringify(req.session))
	req.session.userId ? res.send({ hasSession: true }) : res.send({ hasSession: false })
}
