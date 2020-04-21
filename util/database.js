const { MongoClient } = require('mongodb')

const uri = process.env.DB_URI
const client = new MongoClient(uri, { useUnifiedTopology: true })

exports.connectToDatabase = async () => {
	try {
		await client.connect()
	} catch (err) {
		console.error(err)
	}
}

exports.getClient = () => client
