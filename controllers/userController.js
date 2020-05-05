const userModel = require('../models/userModels')

exports.loginUser = async (req, res) => {
	const { email, password } = req.body

	const user = await userModel.loginUser({ email, password })

	if (!user) {
		res.send('Invalid Credentials')
	}

	const validPassword = await userModel.comparePasswords(user.password, password)

	if (validPassword) {
		req.session.userId = user._id
		res.status(200).send({ status: 200, ...user })
	}
}

exports.registerNewUser = async (req, res) => {
	const { name, email, password, confirmPassword } = req.body
	if (password !== confirmPassword) {
		res.send("Password and Confirm Password didn't match")
	}

	const user = await userModel.registerNewUser({ name, email, password })
	if (!user) {
		res.status(409).send({ message: 'Email already in use' })
	}

	req.session.userId = user._id // Added by cookie-session
	res.status(200).send({ status: 200, message: 'Account Created' })
}

exports.setAPIKeys = async (req, res) => {
	const { publicAPI, secretAPI, exchange } = req.body

	const result = await userModel.updateAPIKeys({ publicAPI, secretAPI, exchange, userId: req.session.userId })
	if (!result) {
		res.send('API Keys failed to update')
	}
	res.status(200).send({ status: 200, message: 'API Keys Updated' })
}

exports.updateAccount = async (req, res) => {
	const { name, email, password } = req.body

	const result = await userModel.updateAccount({ name, email, password, userId: req.session.userId })
	if (!result) {
		res.send('Account Details failed to update')
	}
	res.status(200).send({ status: 200, message: 'Account Details Updated' })
}

exports.getUserInfo = async (req, res) => {
	const result = await userModel.getUser({ userId: req.session.userId })
	if (!result) {
		res.send('Account not found')
	}
	let { name, email, publicAPI, secretAPI, exchange } = result
	res.status(200).send({ name, email, publicAPI, secretAPI, exchange })
}

exports.logout = async (req, res) => {
	req.session = null
	res.status(200).send()
}
