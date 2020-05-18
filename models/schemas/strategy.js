const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Strategy = new Schema({
	strategyName: { type: String, required: true },
	description: { type: String, required: true },
	supportedCoins: { type: Array, required: true },
	details: {
		avgProfitPerTrade: { type: Number, required: false },
		userCount: { type: Number, required: false, default: 0 },
		avgDailySignals: { type: Number, required: false },
		ratingCount: { type: Number, required: true, default: 0 },
		avgRating: { type: Number, required: false }
	},
	reviews: [
		{
			userId: { type: Schema.Types.ObjectId, ref: 'users' },
			userName: { type: String },
			starRating: { type: Number },
			description: { type: String }
		}
	],
	requiredSettings: { type: Array, required: true },
	optionalSettings: { type: Array, required: true }
})

module.exports = mongoose.model('Strategy', Strategy, 'strategies')
