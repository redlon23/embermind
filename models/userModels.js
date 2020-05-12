const User = require('../models/schemas/user')
const crypto = require('crypto')
const util = require('util')
const scrypt = util.promisify(crypto.scrypt)

exports.registerNewUser = async (userDetails) => {
	const hashed = await saltyHash(userDetails.password)
	const hashedDetails = {
		...userDetails,
		password: hashed
	}
	var user = new User(hashedDetails)
	try {
		var result = await user.save()
	} catch (error) {
		if (error.name === 'ValidationError') {
			result = null
		}
	} finally {
		return result
	}
}

exports.loginUser = async (loginCreds) => {
	var query = User.where({ email: loginCreds.email })
	var result = await query.findOne()
	return result
}

exports.updateAPIKeys = async (req) => {
	try {
		let query = {}
		if (req.publicAPI != null && req.publicAPI != undefined) {
			query['publicAPI'] = encrypt(req.publicAPI)
		}
		if (req.secretAPI != null && req.secretAPI != undefined) {
			query['secretAPI'] = encrypt(req.secretAPI)
		}
		if (req.exchange != null && req.exchange != '') {
			query['exchange'] = req.exchange
		}
		var result = User.update({ _id: req.userId }, query).exec()
	} catch (err) {
		console.log(err)
		result = null
	} finally {
		return result
	}
}

exports.updateAccount = async (req) => {
	try {
		let query = {}
		if (req.name != null && req.name != '') {
			query['name'] = req.name
		}
		if (req.password != null && req.password != '') {
			var hashedPassword = await saltyHash(req.password)
			query['password'] = hashedPassword
		}
		if (req.email != null && req.email != '') {
			query['email'] = req.email
		}
		var result = User.update({ _id: req.userId }, query).exec()
	} catch (err) {
		console.log(err)
		result = null
	} finally {
		return result
	}
}

exports.getUser = async (req) => {
	try {
		var result = await User.findOne({ _id: req.userId })
		if (result.publicAPI != undefined && result.publicAPI != null) {
			result.publicAPI = decrypt(result.publicAPI)
		}
		if (result.secretAPI != undefined && result.secretAPI != null) {
			result.secretAPI = decrypt(result.secretAPI)
		}
	} catch (err) {
		console.log(err)
		result = null
	} finally {
		return result
	}
}

exports.getSubscriptionDetails = async (req) => {
	try {
		var result = await User.findById(req.userId, 'subscription')
		return result.subscription
	} catch (err) {
		throw err
	}
}

exports.addPurchasedSubscriptionToDB = async (req) => {
	try {
		// const currentSubDetails = await this.getSubscriptionDetails(req)
		// console.log('currentSubDetails: ' + currentSubDetails)

		// if (currentSubDetails.subscribed) {
		// 	return null
		// }

		const currentDate = new Date().toISOString()
		const thirtyDaysFromNow = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString()

		const result = await User.findByIdAndUpdate(
			req.userId,
			{
				subscription: {
					lastPayment: currentDate,
					nextPayment: thirtyDaysFromNow,
					subscriptionType: 'Standard',
					subscribed: true,
					isRecurring: true
				},
				$push: { paymentRecord: { 'req.paymentRecord.id': 'req.paymentRecord' } }
			},
			{ new: true }
		)
		return result
	} catch (err) {
		throw err
	}
}

exports.endSubscription = async (req) => {
	try {
		const result = await User.findByIdAndUpdate(
			req.userId,
			{
				subscription: {
					nextPayment: null,
					subscriptionType: 'None',
					subscribed: false,
					isRecurring: false
				}
			},
			{ new: true }
		)
		return result
	} catch (err) {
		throw err
	}
}

exports.toggleAutoRenew = async (req) => {
	try {
		const currentRenewalStatus = await User.findById(req.userId)
		const newRenewalStatus = !currentRenewalStatus.subscription.isRecurring

		const result = await User.findByIdAndUpdate(req.userId, { 'subscription.isRecurring': newRenewalStatus }, { new: true })
		return result
	} catch (err) {
		throw err
	}
}

////////////////// HASHING AND ENCRYPTION //////////////////

async function saltyHash(password) {
	const salt = crypto.randomBytes(8).toString('hex')
	const buf = await scrypt(password, salt, 64)
	return `${buf.toString('hex')}.${salt}`
}

exports.comparePasswords = async (saved, supplied) => {
	const [ hashed, salt ] = saved.split('.')
	const hashedSuppliedBuf = await scrypt(supplied, salt, 64)

	return hashed === hashedSuppliedBuf.toString('hex')
}

var config = {
	cryptkey: crypto.createHash('sha256').update('asehtlknajsbipqmanckkahdfs').digest(),
	iv: 'a2xhcgAAAAAAAAAA'
}

function encrypt(text) {
	var cipher = crypto.createCipheriv('aes-256-cbc', config.cryptkey, config.iv)
	return Buffer.concat([ cipher.update(text), cipher.final() ]).toString('base64') // Output base64 string
}

function decrypt(text) {
	if (text === null || typeof text === 'undefined' || text === '') {
		return text
	}
	var decipher = crypto.createDecipheriv('aes-256-cbc', config.cryptkey, config.iv)
	return Buffer.concat([
		decipher.update(text, 'base64'), // Expect `text` to be a base64 string
		decipher.final()
	]).toString()
}
