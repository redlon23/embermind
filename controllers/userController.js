const express = require('express')
const app = express()
const userModel = require('../models/userModels')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.registerNewUser = async (req, res) => {
	try {
		const credsValid = await validateRegistrationCreds(req.body)
		console.log('CredsValid: ' + credsValid)
		if (credsValid === 'Creds Valid') {
			const result = await userModel.registerNewUser(req.body)

			return res.status(200).send({ status: 200, message: `New listing created with id: ${result.insertedId}` })
		} else {
			return res.status(400).send({ status: 400, message: credsValid })
		}
	} catch (err) {
		res.send(' ' + err)
	}
}

const validateRegistrationCreds = async (registrationCreds) => {
	console.log(JSON.stringify(registrationCreds))
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
