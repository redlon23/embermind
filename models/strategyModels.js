const Strategy = require('./schemas/strategy')
const UserStrategySetting = require('./schemas/userStrategySetting')

exports.getAllStrategiesInfo = async () => {
	try {
		const result = await Strategy.find({})
		return result
	} catch (err) {
		throw err
	}
}

exports.setUserStrategyRating = async ({ userId, userRating }) => {
	try {
		const result = await UserStrategySetting.findOneAndUpdate({ userId }, { userRating }, { new: true })
		return result.userRating
	} catch (err) {
		throw err
	}
}
