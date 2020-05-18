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

exports.hasPreviouslyUsedStrategy = async ({ userId, strategyName }) => {
	try {
		const hasPreviouslyUsed = await UserStrategySetting.exists({ userId, strategyName })
		return hasPreviouslyUsed
	} catch (err) {
		throw err
	}
}

exports.setUserStrategyRating = async ({ userId, strategyName, userRating }) => {
	console.log({ userId, strategyName, userRating })
	try {
		const result = await UserStrategySetting.findOneAndUpdate({ userId, strategyName }, { userRating }, { new: true })
		return result.userRating
	} catch (err) {
		throw err
	}
}

exports.isCurrentlyRatedByUser = async ({ strategyName }) => {
	try {
		const result = await UserStrategySetting.findOneAndUpdate({ strategyName }, 'userRating')
		console.log(result.userRating)
		return result.userRating
	} catch (err) {
		throw err
	}
}

exports.incrementStrategyRatingCount = async ({ strategyName }) => {
	try {
		const result = await Strategy.findOneAndUpdate({ strategyName }, { $inc: { 'details.ratingCount': 1 } }, { new: true })
		console.log(result)
		return result.details.ratingCount
	} catch (err) {
		throw err
	}
}

exports.decrementStrategyRatingCount = async ({ strategyName }) => {
	try {
		const result = await Strategy.findOneAndUpdate({ strategyName }, { $dec: { ratingCount: 1 } }, { new: true })
		console.log(result.ratingCount)
		return result.ratingCount
	} catch (err) {
		throw err
	}
}
