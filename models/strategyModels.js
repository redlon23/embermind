const Strategy = require('../models/schemas/strategy')

exports.getAllStrategiesInfo = async () => {
	try {
		const result = await Strategy.find({})
		return result
	} catch (err) {
		throw err
	}
}
