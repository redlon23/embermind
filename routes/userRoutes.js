const express = require('express')
const userController = require('../controllers/userController')
const isApiAuth = require('../util/isApiAuth')
const router = express.Router()

router.post('/registerNewUser', userController.registerNewUser)
router.post('/loginUser', userController.loginUser)
router.get('/logout', userController.logout)
router.post('/setAPIKeys', isApiAuth, userController.setAPIKeys)
router.post('/updateAccount', isApiAuth, userController.updateAccount)
router.get('/getUserInfo', isApiAuth, userController.getUserInfo)
router.get('/getSubscriptionInfo', isApiAuth, userController.getSubscriptionInfo)

router.get('/purchaseSubscription', isApiAuth, userController.purchaseSubscription)
router.get('/processPayment', isApiAuth, userController.processPayment)
router.get('/addPurchasedSubscriptionToDB', isApiAuth, userController.addPurchasedSubscriptionToDB)
router.get('/toggleAutoRenew', isApiAuth, userController.toggleAutoRenew)
router.get('/endSubscription', isApiAuth, userController.endSubscription)

module.exports = router
