const database = require('../util/database')

let client = null

exports.registerNewUser = async (newListing) => {
	try {
		client = await database.connectClient()
		const result = await client.db('embermind-test-db').collection('users').insertOne(newListing)
		return result
	} catch (err) {
		throw err
	} finally {
		await database.closeClient(client)
	}
}
