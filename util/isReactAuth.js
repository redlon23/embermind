exports.isReactAuthLogin = (req, res) => {
	req.session.userId ? res.send({ hasSession: true }) : res.send({ hasSession: false })
}

exports.isReactAuthPrivateRoute = (req, res) => {
	if (req.session.userId) {
		req.session.expiry = Date.now() // Resets the session expiry time whenever user changes page
		res.send({ hasSession: true })
	} else {
		res.send({ hasSession: false })
	}
}
