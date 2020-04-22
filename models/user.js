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
        lastPayment: { type: Date, required: false, default: new Date() },
        //7 day free trial default, next payment due 7 days from today
        nextPayment: { type: Date, required: false, default: new Date(new Date().setDate(new Date().getDate() + 7))},
        subscriptionType: { type: String, required: false, default: "trial"},
        subscribed: { type: Boolean, required: true, default: false }
    }
});

module.exports = mongoose.model('User', User)
