const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const userRoutes = require('./apiRoutes/userRoutes')
app.use('/api', userRoutes)

app.listen(6000, () => {
	console.log('Express server is running on localhost: 6000')
})
