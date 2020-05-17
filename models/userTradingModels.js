const UserStrategySetting = require('./schemas/userStrategySetting')
const Strategy = require('./schemas/strategy')
const User = require('./schemas/user')
const TradeLog = require('./schemas/tradeLog')

// All possible settings initialized in UserStrategySetting doc creation. Strategy doc dictates which are actually used. Add more settings here as list grows.
const allSettingsDefault = {
	quantity: null,
	takeProfit: null,
	stopLoss: null,
	tradeInterval: null,
	maxContractSize: null,
	DCA: null,
	numOrders: null,
	spread: null,
	orderSpread: null,
	rsiKlinePeriod: null,
	rsiOverBought: null,
	rsiOverSold: null,
	trailingSafety: null,
	trailingStop: null,
	noTradingZoneSize: null,
	noTradingZoneRange: null
}

exports.equipStrategy = async ({ userId, strategyName }) => {
	try {
		const hasPreviouslyUsed = await UserStrategySetting.exists({ userId, strategyName })
		if (hasPreviouslyUsed) {
			await UserStrategySetting.update({ userId, strategyName }, { strategyIsEquipped: true })
		} else {
			const strategyData = await Strategy.find({ strategyName })
			await new UserStrategySetting({
				userId,
				strategyName,
				requiredSettings: strategyData[0].requiredSettings,
				optionalSettings: strategyData[0].optionalSettings,
				...allSettingsDefault
			}).save()
		}
	} catch (err) {
		throw err
	}
}

exports.unequipStrategy = async ({ userId, strategyName }) => {
	try {
		await UserStrategySetting.update({ userId, strategyName }, { strategyIsEquipped: false })
	} catch (err) {
		throw err
	}
}

exports.getStrategyEquippedAndRateStatus = async ({ userId, strategyName }) => {
	try {
		const hasPreviouslyUsed = await UserStrategySetting.exists({ userId, strategyName })
		if (hasPreviouslyUsed) {
			const dbResult = await UserStrategySetting.find({ userId, strategyName }, 'strategyIsEquipped userRating -_id')

			const data = {
				strategyIsEquipped: dbResult[0].strategyIsEquipped,
				userRating: dbResult[0].userRating
			}
			console.log(data)
			return data
		}
		return false
	} catch (err) {
		throw err
	}
}

exports.getAllEquippedStrategySettings = async ({ userId }) => {
	try {
		const equippedStrategySettings = await UserStrategySetting.find({ userId, strategyIsEquipped: true }, '-_id -userId')
		return equippedStrategySettings
	} catch (err) {
		throw err
	}
}

exports.updateStrategySettings = async ({ userId, updatedSettings }) => {
	try {
		const strategyName = updatedSettings.strategyName
		const query = updatedSettings
		delete query.strategyName

		await UserStrategySetting.updateOne({ userId, strategyName }, query)
	} catch (err) {
		throw err
	}
}

exports.toggleTrading = async ({ userId }) => {
	try {
		const result = await User.findById(userId)
		const user = await User.findByIdAndUpdate(userId, { tradingEnabled: !result.tradingEnabled }, { new: true })
		return user.tradingEnabled
	} catch (err) {
		throw err
	}
}
///
exports.getSubscriptionDetails = async (req) => {
	try {
		var result = await User.findById(req.userId, 'subscription')
		return result.subscription
	} catch (err) {
		throw err
	}
}
///

////////////////////////////////////////////////////////

// exports.insertStrategySetting = async (req) => {
// 	var stratSetting = new UserStrategySetting(req)
// 	try {
// 		var result = await stratSetting.save()
// 	} catch (error) {
// 		if (error.name === 'ValidationError') {
// 			result = null
// 		}
// 	} finally {
// 		return result
// 	}
// }

exports.getStrategySetting = async (req) => {
	try {
		var result = await TradeLog.findOne({ userId: req.userId, strategyId: req.strategyId })
	} catch (err) {
		console.log(err)
		result = null
	} finally {
		return result
	}
}

exports.getTradeLogs = async (req) => {
	try {
		var result = await TradeLog.find({ userId: req.userId }).toArray()
	} catch (err) {
		console.log(err)
		result = null
	} finally {
		return result
	}
}
