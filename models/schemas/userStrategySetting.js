const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserStrategySetting = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, required: true, ref: 'users', unique: false },
		strategyName: { type: String, required: true, ref: 'strategies' },
		strategyIsEquipped: { type: Boolean, required: true, default: true },
		supportedSettings: { type: Array, required: true, default: [ 'quantity', 'takeProfit', 'stopLoss' ] },

		// Basic Settings
		quantity: { type: Number },
		takeProfit: { type: Number },
		stopLoss: { type: Number },

		// Advanced Settings
		DCA: { type: Boolean },
		maxContractSize: { type: Number },
		noTradingZoneSize: { type: Number },
		noTradingZoneRange: { type: Number },
		numOrders: { type: Number },
		orderSpread: { type: Number },
		rsiKlinePeriod: { type: Number },
		rsiOverBought: { type: Number },
		rsiOverSold: { type: Number },
		spread: { type: Boolean },
		tradeInterval: { type: Number },
		trailingSafety: { type: Number },
		trailingStop: { type: Number }
	},
	{
		versionKey: false
	}
)

module.exports = mongoose.model('UserStrategySetting', UserStrategySetting, 'userStrategySettings')
