// const userModel = require('./apiModels/userModels')

// const testData = {
// 	firstName: 'Test First Name',
// 	lastName: 'Test Last Name',
// 	email: 'Test Email',
// 	password: 'Test Password'
// }

// const insertEntry = async (userData) => {
// 	const result = await userModel.registerNewUser(userData)
// 	console.log(`New listing created with the following id: ${result.insertedId}`)
// }

// insertEntry(testData)

///////////////////

// const db = require('./util/database')

// let client = null

// async function listDatabases() {
// 	try {
// 		client = await db.connectClient()
// 		const databasesList = await client.db().admin().listDatabases()

// 		console.log('Databases:')
// 		databasesList.databases.forEach((db) => console.log(` - ${db.name}`))
// 	} catch (err) {
// 		console.error(err)
// 	} finally {
// 		await client.close()
// 	}
// }

// listDatabases()
