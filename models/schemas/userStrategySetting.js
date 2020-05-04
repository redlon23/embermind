const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserStrategySetting = new Schema ({
    strategyId: {type: Schema.Types.ObjectId, required: true, ref: 'strategies', unique: false },
    strategyName: {type: String, required: true, ref: 'strategies' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users', unique: false },
    contractQuantity: { type: Number},//, required: true },
    takeProfit: { type: Number },
    tradeInterval: { type: Number },
    maxContractSize: { type: Number },
    DCA: { type: Boolean, default: true },
    numOrders: { type: Number },
    spread: { type: Boolean, default: true },
    orderSpread: { type: Number },
    trailingSafety: { type: Number },
    trailingStop: { type: Number },
    noTradingZoneSize: { type:Number },
    noTradingZoneRange: { type: Number }
});

UserStrategySetting.index({ userId: 1, strategyId: 1 }, { unique: true })


module.exports = mongoose.model('UserStrategySetting', UserStrategySetting, 'userStrategySettings')
