let userModel = null

// userModel loaded by database when server.js started
exports.loadUserModel = async (client) => {
	userModel = await client.db('embermind-test-db').collection('users')
}

exports.registerNewUser = async (registrationCreds) => {
	try {
		result = userModel.insertOne(registrationCreds)
		return result
	} catch (err) {
		throw err
	}
}

exports.loginUser = async (loginCreds) => {
	try {
		result = await userModel.find({ email: loginCreds.email, password: loginCreds.password }).toArray()
		return result
	} catch (err) {
		throw err
	}
}
