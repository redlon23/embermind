const express = require('express')
const tradeRecordController = require('../controllers/tradeRecordController')
const isApiAuth = require('../util/isApiAuth')
const router = express.Router()

router.get('/getUnrealizedPnL', isApiAuth, tradeRecordController.getUnrealizedPnL)
router.get('/getDailyPnL', isApiAuth, tradeRecordController.getDailyPnL)
router.get('/getWeeklyPnL', isApiAuth, tradeRecordController.getWeeklyPnL)
router.get('/getMonthlyPnL', isApiAuth, tradeRecordController.getMonthlyPnL)
router.get('/getWalletBalance', isApiAuth, tradeRecordController.getWalletBalance)
router.get('/getOpenPositions', isApiAuth, tradeRecordController.getOpenPositions)

module.exports = router