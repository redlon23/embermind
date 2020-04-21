const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.route('/registerNewUser').post(userController.registerNewUser)
router.route('/loginUser').post(userController.loginUser)

module.exports = router
