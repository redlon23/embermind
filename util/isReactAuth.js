exports.isReactAuthLogin = (req, res) => {
	req.session.userId ? res.send({ hasSession: true }) : res.send({ hasSession: false })
}

exports.isReactAuthPrivateRoute = (req, res) => {
	console.log('HERRREEE: ' + JSON.stringify(req.session))
	console.log('HERRREEE 2: ' + JSON.stringify(req.session))

	if (req.session.userId) {
		req.sessionOptions.maxAge = 900000 //15 minutes -- refreshed each time user changes page
		res.send({ hasSession: true })
	} else {
		res.send({ hasSession: false })
	}
}
