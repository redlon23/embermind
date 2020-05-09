const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./util/database') //Need this defined -- don't delete it
const path = require('path')
const cookieSession = require('cookie-session')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
	cookieSession({
		httpOnly: true,
		keys: [ 'jd78h756ad98s81224nvm7125j' ],
		maxAge: 1800000 //30 minutes
	})
)

const paypal = require('paypal-rest-sdk')
paypal.configure({
	mode: 'sandbox', //sandbox or live
	client_id: 'AWPXamAP9KGfjx6Uw0wFz2rzgjza7LwoJAshQg8qP69sx6eI5vrVz21W2MbG-mb2IJyLLEhcrSYI9uCz',
	client_secret: 'EOMWIvGaVY_9FTkmYHHu7Af-N6KPiZWRJJIm7lPKXsiPLI8f7QcRGcWnyTdPkP_D_TZMID_YXD_QHGWp'
})

const userRoutes = require('./routes/userRoutes')
app.use('/api', userRoutes)

const userTradingRoutes = require('./routes/userTradingRoutes')
app.use('/api', userTradingRoutes)

const strategyRoutes = require('./routes/strategyRoutes')
app.use('/api', strategyRoutes)

const utilRoutes = require('./routes/utilRoutes')
app.use('/api', utilRoutes)

// If hosted, node backend loads react frontend, which handles further routing
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

app.listen(process.env.PORT || 6000, () => {
	console.log('Express server is running on localhost: 6000')
})
