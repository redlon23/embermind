const express = require('express')
const paymentController = require('../controllers/paymentController')
const isApiAuth = require('../util/isApiAuth')
const router = express.Router()

router.get('/initializePaypalPayment', isApiAuth, paymentController.initializePaypalPayment)
router.get('/executePayment', isApiAuth, paymentController.executePayment)
router.get('/paymentCancelled', isApiAuth, paymentController.paymentCancelled)

module.exports = router
