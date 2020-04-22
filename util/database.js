const mongoose = require('mongoose')
const userModel = require('../models/userModels')

const uri = process.env.DB_URI
mongoose.connect(uri, {useNewUrlParser: true});
