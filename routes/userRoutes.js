const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.route('/registerNewUser').post(userController.registerNewUser)

module.exports = router
