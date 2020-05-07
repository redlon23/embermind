const express = require('express')
const strategyController = require('../controllers/strategyController')
const isApiAuth = require('../util/isApiAuth')
const router = express.Router()

router.get('/getAllStrategiesInfo', isApiAuth, strategyController.getAllStrategiesInfo)

module.exports = router
