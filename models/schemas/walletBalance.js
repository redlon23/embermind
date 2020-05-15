const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletBalance = new Schema ({
    userId: { type: Schema.Types.ObjectId, required: true },
    balance: { type: Number, required: true },
    symbol: { type: String, required: true },
    date: { type: Date, required: true, default: new Date().toISOString() }
});

module.exports = mongoose.model('WalletBalance', WalletBalance, 'walletBalances')
