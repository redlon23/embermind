const User = require('../models/schemas/user');
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
		var hashedPublic = encrypt(req.publicAPI);
		var hashedSecret = encrypt(req.secretAPI);
		let query = {};
		if(req.publicAPI != null && req.publicAPI != undefined){
			query["publicAPI"] = await saltyHash(req.publicAPI);
		}
		if(req.secretAPI != null && req.secretAPI != undefined){
			query["secretAPI"] = await saltyHash(req.secretAPI);
		}
		if(req.exchange != null && req.exchange != ''){
			query["exchange"] = req.exchange;
		}
		var result = User.update({_id: req.userId}, { $set:{ publicAPI: hashedPublic, secretAPI: hashedSecret, exchange: req.exchange }}).exec();
	} catch(err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}

exports.updateAccount = async (req) => {
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
		var result = await User.findOne({_id: req.userId});
		if(result.publicAPI != undefined && result.publicAPI != null){
			result.publicAPI = decrypt(result.publicAPI);
		}
		if(result.secretAPI != undefined && result.secretAPI != null){
			result.secretAPI = decrypt(result.secretAPI);
		}
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
  
var config = {
	cryptkey: crypto.createHash('sha256').update('asehtlknajsbipqmanckkahdfs').digest(),
	iv: 'a2xhcgAAAAAAAAAA'
  }
  
  function encrypt (text) {
	console.log(config.cryptkey)
	var cipher = crypto.createCipheriv('aes-256-cbc', config.cryptkey, config.iv)
	return Buffer.concat([
	  cipher.update(text),
	  cipher.final()
	]).toString('base64') // Output base64 string
  }
  
  function decrypt (text) {
	console.log(config.cryptkey)
	if (text === null || typeof text === 'undefined' || text === '') {
	  return text
	}
	var decipher = crypto.createDecipheriv('aes-256-cbc', config.cryptkey, config.iv)
	return Buffer.concat([
	  decipher.update(text, 'base64'), // Expect `text` to be a base64 string
	  decipher.final()
	]).toString()
  }