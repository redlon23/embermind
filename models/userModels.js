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
		var hashedPublic = await saltyHash(req.publicAPI);
		var hashedSecret = await saltyHash(req.secretAPI);
		var result = User.update({_id: req.userId}, { $set:{ publicAPI: hashedPublic, secretAPI: hashedSecret, exchange: req.exchange }}).exec();
	} catch(err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}

exports.updateAccount = async (req) => {
	console.log(req)
	try{
		let query = {};
		if(req.name != null && req.name != ''){
			query["name"] = req.name;
		}
		if(req.password != null && req.password != ''){
			var hashedPassword = await saltyHash(req.password);
			query["password"] = hashedPassword;
		}
		if(req.email != null && req.email != ''){
			query["email"] = req.email;
		}
		var result = User.update({_id: req.userId}, query).exec();
	} catch(err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}

exports.getUser = async (req) => {
	try{
		var result = User.findOne({_id: req.userId});
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
