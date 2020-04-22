const User = require('../models/user');

exports.registerNewUser = async (req) => {
	var user = new User(req);
	var result = await user.save();
	console.log(result);
	return result;
    //return await user.save(function (err, obj) {
	//	if (err) throw err;
	//	//else user is registered
	//	console.log("models" + obj);
	//	//return obj ?
	//}).obj;
};

exports.loginUser = async (loginCreds) => {
	var query  = User.where({ email: loginCreds.email, password: loginCreds.password });
	query.findOne(function (err, user) {
  		if (err) throw err;
  		if (user) {
			//save in session?
			return user;
  		}
	});
}
