const UserStrategySetting = require('./schemas/userStrategySetting')
const Strategy = require('./schemas/strategy')
const TradeLog = require('./schemas/tradeLog')

// All possible settings initialized in UserStrategySetting doc creation. Strategy doc dictates which are actually used. Add more settings here as list grows.
const allSettingsDefault = {
	contractQuantity: null,
	takeProfit: null,
	stopLoss: null,
	tradeInterval: null,
	maxContractSize: null,
	DCA: null,
	numOrders: null,
	spread: null,
	orderSpread: null,
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
			const supportedSettings = await Strategy.find({ strategyName }, 'supportedSettings')
			await new UserStrategySetting({
				userId,
				strategyName,
				supportedSettings: supportedSettings[0].supportedSettings,
				...allSettingsDefault
			}).save()
		}
	} catch (err) {
		throw err
	}
}

exports.unequipStrategy = async ({ userId, strategyName }) => {
	try {
		await await UserStrategySetting.update({ userId, strategyName }, { strategyIsEquipped: false })
	} catch (err) {
		throw err
	}
}

exports.getStrategyEquippedStatus = async ({ userId, strategyName }) => {
	try {
		const hasPreviouslyUsed = await UserStrategySetting.exists({ userId, strategyName })
		if (hasPreviouslyUsed) {
			const strategyIsEquipped = await UserStrategySetting.find({ userId, strategyName }, 'strategyIsEquipped')
			return strategyIsEquipped[0].strategyIsEquipped
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

////////////////////////////////////////////////////////

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
