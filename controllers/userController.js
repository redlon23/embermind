const userModel = require('../models/userModels')

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	
	const user = await userModel.loginUser({email, password})

	if(!user){
		res.send("Invalid Credentials")
	}

	const validPassword = await userModel.comparePasswords(user.password, password)

	req.session.userId = user._id
	res.status(200).send({ status: 200, ...user })
}

exports.registerNewUser = async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body
	if(password !== confirmPassword){
		res.send("Password and Confirm Password didn't match")
	}

	const user = await userModel.registerNewUser({ firstName, lastName, email, password })
	if(!user){
		res.send("Provided email is in use!");
	}

	req.session.userId = user._id; // Added by cookie-session
	res.send("Account Created");
}

exports.logout = async (req, res) =>{
	req.session = null;
	res.redirect("/");
}
