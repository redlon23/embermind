exports.isReactAuthLogin = (req, res) => {
	req.session.userId ? res.send({ hasSession: true }) : res.send({ hasSession: false })
}

exports.isReactAuthPrivateRoute = (req, res) => {
	if (req.session.userId) {
		req.session.maxAge = 900000 //15 minutes -- timer should restart each time user changes page
		res.send({ hasSession: true })
	} else {
		res.send({ hasSession: false })
	}
}
