const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpenPosition = new Schema ({
    userId: { type: Schema.Types.ObjectId, required: true },
    entryPrice: { type: Number },
    exitPrice: { type: Number },
    side: { type: String },
    symbol: { type: String },
    date: { type: Date, required: true, default: new Date().toISOString() }
});

module.exports = mongoose.model('OpenPosition', OpenPosition, 'openPositions')
