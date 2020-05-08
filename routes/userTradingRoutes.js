const express = require('express')
const userTradingController = require('../controllers/userTradingController')
const isApiAuth = require('../util/isApiAuth')
const router = express.Router()

router.get('/equipStrategy', isApiAuth, userTradingController.equipStrategy)
router.get('/unequipStrategy', isApiAuth, userTradingController.unequipStrategy)
router.get('/getStrategyEquippedStatus', isApiAuth, userTradingController.getStrategyEquippedStatus)
router.post('/updateStrategySetting', isApiAuth, userTradingController.updateStrategySetting)

module.exports = router
