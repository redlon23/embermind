const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MinuteRecord = new Schema ({
    userId: { type: Schema.Types.ObjectId, required: true },
    unrealizedPnL: { type: Number, required: true },
    date: { type: Date, required: true, default: new Date().toISOString() }
});

module.exports = mongoose.model('MinuteRecord', MinuteRecord, 'minuteRecords')
