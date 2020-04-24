const User = require('../models/user');
const crypto = require('crypto')
const util = require("util")
const scrypt = util.promisify(crypto.scrypt)

exports.registerNewUser = async (userDetails) => {
	const hashed = await saltyHash(userDetails.password);
	const hashedDetails = {
		...userDetails,
		password: hashed
	} 
	var user = new User(hashedDetails);
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
	var query  = User.where({ email: loginCreds.email});
	var result = await query.findOne();
	return result;
}

exports.updateAPIKeys = async (req) => {
	try{
		var result = User.update({_id: req.userId}, { $set:{ publicAPI: req.publicAPI, secretAPI: req.secretAPI }}).exec();
	} catch(err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}

async function saltyHash(password){
	const salt = crypto.randomBytes(8).toString('hex');
	const buf = await scrypt(password, salt, 64)
	return `${buf.toString('hex')}.${salt}`;
}

 exports.comparePasswords = async (saved, supplied) =>{
	const [hashed, salt] = saved.split('.');
	const hashedSuppliedBuf = await scrypt(supplied, salt, 64)
	
	return hashed === hashedSuppliedBuf.toString('hex')
}
