const express = require('express')
const userController = require('../controllers/userController')
const isReactAuth = require('../util/isReactAuth')
const router = express.Router()

router.get('/isReactAuth', isReactAuth.isReactAuthenticated)
router.post('/registerNewUser', userController.registerNewUser)
router.post('/loginUser', userController.loginUser)
router.get('/logout', userController.logout)

module.exports = router
