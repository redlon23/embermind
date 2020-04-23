const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Strategy = new Schema ({
    title: { type: String, required: true },
    descripion: { type: String, required: true },
    details: {
        avgProfitPerTrade: { type: Number, required: false },
        subscriberCount: { type: Number, required: false, default: 0},
        avgDailySignals: { type: Number, required: false },
    },
    reviews: [{
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        userName: { type: String },
        starRating: { type: Number },
        description: { type: String }
    }]
});

module.exports = mongoose.model('Strategy', Strategy, 'strategy')
