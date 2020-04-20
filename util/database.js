const { MongoClient } = require('mongodb')

const uri = process.env.DB_URI
const client = new MongoClient(uri, { useUnifiedTopology: true })

exports.connectClient = async () => {
	try {
		await client.connect()
		return client
	} catch (err) {
		console.error(err)
	}
}

exports.closeClient = async (client) => {
	if (client) {
		try {
			client.close()
		} catch (err) {
			console.error(err)
		}
	}
}
