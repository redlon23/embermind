const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./util/database')
const path = require('path')
const cookieSession = require('cookie-session')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
	cookieSession({
		httpOnly: false,
		keys: [ 'jd78h756ad98s81224nvm7125j' ],
		user_id: '999'
	})
)

//db.setupDatabase()

const userRoutes = require('./routes/userRoutes')
app.use('/api', userRoutes)

// If hosted, node backend loads react frontend, which handles further routing
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

app.listen(process.env.PORT || 6000, () => {
	console.log('Express server is running on localhost: 6000')
})
