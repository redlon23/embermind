const User = require('../models/user');

exports.registerNewUser = async (userDetails) => {
	var user = new User(userDetails);
	try{
		var result = await user.save();
	} catch(error){
		if(error.name === "ValidationError"){
			result = null
		}
	} finally{
		return result
	}
};

exports.loginUser = async (loginCreds) => {
	var query  = User.where({ email: loginCreds.email, password: loginCreds.password });
	var result = await query.findOne();
	return result;
}
