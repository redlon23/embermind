const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonthlyRecord = new Schema ({
    userId: { type: Schema.Types.ObjectId, required: true },
    loss: { type: Number, required: true },
    gain: { type: Number, required: true },
    date: { type: Date, required: true, default: new Date().toISOString() }
});

module.exports = mongoose.model('MonthlyRecord', MonthlyRecord, 'monthlyRecords')
