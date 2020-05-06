const express = require('express')
const userTradingController = require('../controllers/userTradingController')
const isApiAuth = require('../util/isApiAuth')
const router = express.Router()

router.post('/updateStrategySetting', isApiAuth, userTradingController.updateStrategySetting)

module.exports = router
