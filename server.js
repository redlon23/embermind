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

console.log('ENV: ' + process.env.NODE_ENV)

const paypal = require('paypal-rest-sdk')
// if (process.env.NODE_ENV === 'production') {
// 	// LIVE payment credentials (Real money)
// 	paypal.configure({
// 		mode: 'live',
// 		client_id: 'AUwiml3PxTRl9TY64pOE9v5vSIcPMS0ZSgUIKReYSsvaVSoMd_Y61awY59rhjmrE37MT7Vx4fExy6Lp1',
// 		client_secret: 'EOYQcMMYH3AySZLfMuPKG0hsMVDqQxJuTNZ9KU8v1fbfsHNEfQR9u6fSD40YFKsYAiv6g1RuKCpVVtHD'
// 	})
// } else {

// 	// SANDBOX payment credentials (Fake money -- use for development)
paypal.configure({
	mode: 'sandbox',
	client_id: 'AeGuz5Q24jPl20xErgTDIMRbkvDDNYOKOOSHTSr_boJlFuhK0uNiHRBywgQ_C0kiQgsFo9n6mg__aEGs',
	client_secret: 'EHSb993cvMR3jsLLkmta4Y9jONzYEK095rbNnrLj8U-YTYkvJHs34eI4VAVo5evDEz1jS_irQOIw8gvk'
})
// }

const userRoutes = require('./routes/userRoutes')
app.use('/api', userRoutes)

const userTradingRoutes = require('./routes/userTradingRoutes')
app.use('/api', userTradingRoutes)

const strategyRoutes = require('./routes/strategyRoutes')
app.use('/api', strategyRoutes)

const paymentRoutes = require('./routes/paymentRoutes')
app.use('/api', paymentRoutes)

const utilRoutes = require('./routes/utilRoutes')
app.use('/api', utilRoutes)

const tradeRecordRoutes = require('./routes/tradeRecordRoutes')
app.use('/api', tradeRecordRoutes)

// If hosted, node backend loads react frontend, which handles further routing
// **Production env variable set by Heroku during hosting. We may have to set it manually if hosting elsewhere.**
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

app.listen(process.env.PORT || 6000, () => {
	console.log('Express server is running on localhost: 6000')
})
