const express = require('express')
const userController = require('../apiControllers/userController')
const router = express.Router()

router.route('/registerNewUser').post(userController.registerNewUser)

module.exports = router