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
	try {
		const result = await UserStrategySetting.findOneAndUpdate({ userId, strategyName }, { userRating }, { new: true })
		return result.userRating
	} catch (err) {
		throw err
	}
}

exports.isCurrentlyRatedByUser = async ({ userId, strategyName }) => {
	try {
		const result = await UserStrategySetting.findOne({ userId, strategyName }, 'userRating', { new: true })
		return result.userRating
	} catch (err) {
		throw err
	}
}

exports.incrementStrategyRatingCount = async ({ strategyName }) => {
	try {
		const result = await Strategy.findOneAndUpdate({ strategyName }, { $inc: { 'details.ratingCount': 1 } }, { new: true })
		return result.details.ratingCount
	} catch (err) {
		throw err
	}
}

exports.decrementStrategyRatingCount = async ({ strategyName }) => {
	try {
		const result = await Strategy.findOneAndUpdate({ strategyName }, { $inc: { 'details.ratingCount': -1 } }, { new: true })
		return result.details.ratingCount
	} catch (err) {
		throw err
	}
}

exports.calculateAndUpdateAvgRating = async ({ strategyName }) => {
	try {
		let ratingsObjs = await UserStrategySetting.find({ strategyName }, 'userRating -_id')

		let ratingsArray = []
		for (ratingObj of ratingsObjs) {
			if (ratingObj.userRating !== null) {
				ratingsArray.push(ratingObj.userRating)
			}
		}

		const sumRatings = ratingsArray.reduce((a, b) => a + b, 0)
		const avgRating = sumRatings / ratingsArray.length || 0

		const strategy = await Strategy.findOneAndUpdate({ strategyName }, { 'details.avgRating': avgRating }, { new: true })
		return strategy.details.avgRating.toFixed(1)
	} catch (err) {
		throw err
	}
}

exports.incrementStrategyUserCount = async ({ strategyName }) => {
	try {
		const result = await Strategy.findOneAndUpdate({ strategyName }, { $inc: { 'details.userCount': 1 } }, { new: true })
		return result.details.userCount
	} catch (err) {
		throw err
	}
}

exports.decrementStrategyUserCount = async ({ strategyName }) => {
	try {
		const result = await Strategy.findOneAndUpdate({ strategyName }, { $inc: { 'details.userCount': -1 } }, { new: true })
		return result.details.userCount
	} catch (err) {
		throw err
	}
}
