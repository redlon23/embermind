const express = require('express')
const app = express()
require('dotenv').config()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const userRoutes = require('./routes/userRoutes')
app.use('/api', userRoutes)

app.listen(process.env.PORT || 6000, () => {
	console.log('Express server is running on localhost: 6000')
})
