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

exports.insertStrategySetting = async (req) => {
	var stratSetting = new UserStrategySetting(req)
	try {
		var result = await stratSetting.save()
	} catch (error) {
		if (error.name === 'ValidationError') {
			result = null
		}
	} finally {
		return result
	}
}

exports.updateStrategySetting = async (userId, request) => {
	try {
		let query = {}
		if (request.strategyId) query['strategyId'] = request.strategyId
		if (request.strategyName) query['strategyName'] = request.strategyName
		if (userId) query['userId'] = userId
		if (request.contractQuantity) query['contractQuantity'] = request.contractQuantity
		if (request.takeProfit) query['takeProfit'] = request.takeProfit
		if (request.tradeInterval) query['tradeInterval'] = request.tradeInterval
		if (request.maxContractSize) query['maxContractSize'] = request.maxContractSize
		if (request.DCA) query['DCA'] = request.DCA
		if (request.numOrders) query['numOrders'] = request.numOrders
		if (request.spread) query['spread'] = request.spread
		if (request.orderSpread) query['orderSpread'] = request.orderSpread
		if (request.trailingSafety) query['trailingSafety'] = request.trailingSafety
		if (request.trailingStop) query['trailingStop'] = request.trailingStop
		if (request.noTradingZoneSize) query['noTradingZoneSize'] = request.noTradingZoneSize
		if (request.noTradingZoneRange) query['noTradingZoneRange'] = request.noTradingZoneRange

		var result = UserStrategySetting.update({ userId: request.userId, strategyId: request.strategyId }, query, { upsert: true }).exec()
	} catch (err) {
		console.log(err)
		result = null
	} finally {
		return result
	}
}

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
