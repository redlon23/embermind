const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    exchange: { type: String, required: false},
    publicAPI: { type: String, required: false },
    secretAPI: { type: String, required: false },
    subscription: {
        lastPayment: { type: Date, required: false },
        nextPayment: { type: Date, required: false },
        subscriptionType: { type: String, required: false, default: "monthly"},
        subscribed: { type: Boolean, required: true, default: false }
    }
});

module.exports = mongoose.model('User', User)
