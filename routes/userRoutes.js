const express = require('express')
const userController = require('../controllers/userController')
const isApiAuth = require('../util/isApiAuth')
const router = express.Router()

router.post('/registerNewUser', userController.registerNewUser)
router.post('/loginUser', userController.loginUser)
router.get('/logout', userController.logout)
router.post('/setAPIKeys', userController.setAPIKeys)
router.post('/updateAccount', userController.updateAccount)
router.get('/getUserInfo', userController.getUserInfo)

module.exports = router
