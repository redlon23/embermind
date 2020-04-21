const database = require('../util/database')

exports.registerNewUser = async (newListing) => {
	try {
		const client = database.getClient()
		result = await client.db('embermind-test-db').collection('users').insertOne(newListing)
		return result
	} catch (err) {
		throw err
	}
}
