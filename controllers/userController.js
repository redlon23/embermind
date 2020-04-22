const userModel = require('../models/userModels')

exports.loginUser = async (req, res) => {
	try {
		const result = await userModel.loginUser(req.body)
		if (result.length !== 0) {
			res.status(200).send({ status: 200, ...result })
		} else {
			res.status(400).send({ status: 400, message: 'Invalid Credentials' })
		}
	} catch (err) {
		res.send(' ' + err)
	}
}

exports.registerNewUser = async (req, res) => {
	const {firstName, lastName, email, password, confirmPassword} = req.body
	if(password !== confirmPassword){
		res.send("Password and Confirm Password didn't match")
	}
	const newUser = await userModel.registerNewUser({ firstName, lastName, email, password })
	if(!newUser){
		res.send("Provided email is in use!")
	} else{
		res.send("Success!")
	}
}

const validateRegistrationCreds = async (registrationCreds) => {
	for (const field of Object.values(registrationCreds)) {
		if (field === null) {
			return 'Fields cannot be empty'
		}
	}

	if (registrationCreds.password !== registrationCreds.confirmPassword) {
		return 'Passwords must match'
	}

	// const emailExists = await fetch('/checkEmailExists') = {

	// }
	// if (emailExists) {
	//   return false
	// }

	return 'Creds Valid'
}
