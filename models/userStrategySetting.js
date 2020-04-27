const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserStrategySetting = new Schema ({
    strategyId: {type: Schema.Types.ObjectId, required: true, ref: 'strategies', unique: false },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users', unique: false },
    quantity: { type: Number, required: true },
    takeProfit: { type: Number },
    interval: { type: Number },
    maxSize: { type: Number },
    DCAOn: { type: Boolean },
    orderNumber: { type:Number },
    spreadOn: { type: Boolean },
    orderSpread: { type: Number },
    trailingSafety: { type: Boolean },
    trailingStop: { type: Number },
    noTradingZoneSize: { type:Number },
    noTradingZoneRange: { type: Number }
});

UserStrategySetting.index({ userId: 1, strategyId: 1 }, { unique: true })


module.exports = mongoose.model('UserStrategySetting', UserStrategySetting, 'userStrategySettings')
