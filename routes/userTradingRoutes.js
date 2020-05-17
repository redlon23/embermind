const express = require('express')
const userTradingController = require('../controllers/userTradingController')
const isApiAuth = require('../util/isApiAuth')
const router = express.Router()

router.get('/equipStrategy', isApiAuth, userTradingController.equipStrategy)
router.get('/unequipStrategy', isApiAuth, userTradingController.unequipStrategy)
router.get('/getStrategyEquippedAndRateStatus', isApiAuth, userTradingController.getStrategyEquippedAndRateStatus)
router.get('/getAllEquippedStrategySettings', isApiAuth, userTradingController.getAllEquippedStrategySettings)
router.post('/updateStrategySettings', isApiAuth, userTradingController.updateStrategySettings)
router.get('/toggleTrading', isApiAuth, userTradingController.toggleTrading)

module.exports = router
