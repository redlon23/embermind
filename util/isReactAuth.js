exports.isReactAuthenticated = (req, res) => {
	req.session.userId ? res.send({ hasSession: true }) : res.send({ hasSession: false })
}
