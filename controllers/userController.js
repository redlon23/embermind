const userModel = require('../models/userModels')

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await userModel.loginUser({ email, password })
		const validPassword = await userModel.comparePasswords(user.password, password)
		if (!validPassword) {
			throw new Error()
		}
		req.session.userId = user._id
	} catch (err) {
		console.error(err)
		res.status(401).send({ message: 'Invalid Credentials' })
	}

	try {
		await validateSubscriptionExpiry(req)
		res.status(200).send()
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'Subscription Validation Error' })
	}
}

const validateSubscriptionExpiry = async (req) => {
	try {
		const result = await userModel.getSubscriptionDetails({ userId: req.session.userId })
		const { subscribed, nextPayment, isRecurring } = result
		const expBillDate = new Date(nextPayment).getTime()
		const currentDate = new Date().getTime()

		if (currentDate > expBillDate) {
			if (subscribed && isRecurring) {
				await userModel.purchaseSubscription({ userId: req.session.userId })
			} else if (subscribed && !isRecurring) {
				await userModel.endSubscription({ userId: req.session.userId })
			}
		}

		return 'Subscription Validation Successful'
	} catch (err) {
		console.error(`Subscription Validation Failed: ${err}`)
		return null
	}
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

	res.status(200).send({ name, email, publicAPI, exchange, hasSecretAPI: secretAPI ? true : false })
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
		res.status(200).send(result)
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'DB error' })
	}
}

exports.toggleAutoRenew = async (req, res) => {
	try {
		const result = await userModel.toggleAutoRenew({ userId: req.session.userId })
		res.status(200).send({ message: `Auto-renew: ${result.subscription.isRecurring ? 'enabled' : 'disabled'}` })
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'DB Error' })
	}
}

exports.endSubscription = async (req, res) => {
	try {
		await userModel.endSubscription({ userId: req.session.userId })
		res.status(200).send({ message: 'DEV UNSUBSCRIBED' })
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'DEV DB Error' })
	}
}
