const Strategy = require('../models/schemas/strategy')

exports.getAllStrategiesInfo = async () => {
	try {
		var result = await Strategy.find({})
		return result
	} catch (err) {
		throw err
	}
}
