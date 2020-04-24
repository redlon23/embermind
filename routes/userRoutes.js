const express = require('express')
const userController = require('../controllers/userController')
const isAuth = require('../util/isAuth')
const router = express.Router()

router.get('/isAuth', isAuth.isReactAuthenticated)
router.post('/registerNewUser', userController.registerNewUser)
router.post('/loginUser', userController.loginUser)
router.get('/logout', userController.logout)

module.exports = router
