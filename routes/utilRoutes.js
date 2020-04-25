const express = require('express')
const router = express.Router()
const isReactAuth = require('../util/isReactAuth')

router.get('/isReactAuth', isReactAuth.isReactAuthenticated)

module.exports = router
