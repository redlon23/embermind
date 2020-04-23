const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.post('/registerNewUser', userController.registerNewUser)
router.post('/loginUser', userController.loginUser)
router.get("/logout", userController.logout)


module.exports = router
