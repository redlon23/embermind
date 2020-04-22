const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const userModel = require('../models/userModels')

const uri = process.env.DB_URI
const client = new MongoClient(uri, { useUnifiedTopology: true })

exports.setupDatabase = async () => {
	try {
		await client.connect()
		await loadModels()
	} catch (err) {
		console.error(err)
	}
}

const loadModels = async () => {
	try {
		await userModel.loadUserModel(client)
	} catch (err) {
		throw err
	}
}
