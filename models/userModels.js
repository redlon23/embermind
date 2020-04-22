const User = require('../models/user');

exports.registerNewUser = async (req) => {
	var user = new User(req);
	var result = await user.save();
	return result;
};

exports.loginUser = async (loginCreds) => {
	var query  = User.where({ email: loginCreds.email, password: loginCreds.password });
	var result = await query.findOne();
	return result;
}
