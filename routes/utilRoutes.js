const express = require('express')
const router = express.Router()
const isReactAuth = require('../util/isReactAuth')

router.get('/isReactAuthLogin', isReactAuth.isReactAuthLogin)
router.get('/isReactAuthPrivateRoute', isReactAuth.isReactAuthPrivateRoute)

module.exports = router
