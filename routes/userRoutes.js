const express = require('express')
const userController = require('../controllers/userController')
const isApiAuth = require('../util/isApiAuth')
const router = express.Router()

router.post('/registerNewUser', userController.registerNewUser)
router.post('/loginUser', userController.loginUser)
router.get('/logout', isApiAuth, userController.logout)
router.post('/setAPIKeys', isApiAuth, userController.setAPIKeys)
router.post('/updateAccount', isApiAuth, userController.updateAccount)

module.exports = router
