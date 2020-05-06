const userModel = require('../models/userModels')

exports.loginUser = async (req, res) => {
	const { email, password } = req.body

	const user = await userModel.loginUser({ email, password })

	if (!user) {
		res.status(401).send({ message: 'Invalid Credentials' })
	}

	req.session.userId = user._id
	res.status(200).send({ message: 'Logging in...' })
}

exports.registerNewUser = async (req, res) => {
	const { name, email, password } = req.body
	const user = await userModel.registerNewUser({ name, email, password })
	if (!user) {
		res.status(409).send({ message: 'Email already in use' })
	}

	req.session.userId = user._id // Added by cookie-session
	res.status(200).send({ message: 'Account Created' })
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

exports.purchaseSubscription = async (req, res) => {
	try {
		await userModel.purchaseSubscription({ userId: req.session.userId })
		res.status(200).send({ message: 'New subscription purchased!' })
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'DB Error' })
	}
}

exports.getSubscriptionInfo = async (req, res) => {
	try {
		const result = await userModel.getSubscriptionDetails({ userId: req.session.userId })
		console.log('Result2: ' + result)
		res.status(200).send(result)
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'DB error' })
	}
}

exports.toggleAutoRenew = async (req, res) => {
	try {
		const result = await userModel.toggleAutoRenew({ userId: req.session.userId })
		console.log(result)
		res.status(200).send({ message: 'New subscription purchased!' })
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'DB Error' })
	}
}

exports.devImmediateUnsubscribe = async (req, res) => {
	try {
		await userModel.devImmediateUnsubscribe({ userId: req.session.userId })
		res.status(200).send({ message: 'DEV UNSUBSCRIBED' })
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'DEV DB Error' })
	}
}
