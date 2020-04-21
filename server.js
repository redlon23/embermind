const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const userRoutes = require('./routes/userRoutes')
app.use('/api', userRoutes)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

app.listen(process.env.PORT || 6000, () => {
	console.log('Express server is running on localhost: 6000')
})
