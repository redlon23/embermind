const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/registerNewUser', (req, res) => {
	console.log(req.body)
	res.send({ data: 'HELLOOOOOO' })
})

app.listen(6000, () => {
	console.log('Express server is running on localhost: 6000')
})
