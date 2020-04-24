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
	const { firstName, lastName, email, password, confirmPassword } = req.body
	if (password !== confirmPassword) {
		res.send("Password and Confirm Password didn't match")
	}

	const user = await userModel.registerNewUser({ firstName, lastName, email, password })
	if (!user) {
		res.send('Provided email is in use!')
	}

	req.session.userId = user._id // Added by cookie-session
	res.status(200).send({ status: 200, message: 'Account Created' })
}

//TODO: Test once front end is finished
exports.setAPIKeys = async (req, res) => {
	const { publicAPI, privateAPI } = req.body;

	const result = await userModel.updateAPIKeys({ publicAPI, privateAPI, userId: req.session.userId });
	if(!result){
		res.send('API Keys failed to update');
	}
	res.status(200).send({ status: 200, message: 'API Keys Updated' });
}

exports.logout = async (req, res) => {
	req.session = null
	console.log('THIS3: ' + JSON.stringify(req.session))
	res.status(200).send({ status: 200 })
}
