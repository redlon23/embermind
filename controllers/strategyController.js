const strategyModel = require('../models/strategyModels')

exports.getAllStrategiesInfo = async (req, res) => {
	try {
		const result = await strategyModel.getAllStrategiesInfo()
		console.log('FETCHED THIS: ' + result)
		res.status(200).send(result)
	} catch (err) {
		res.status(500).send({ message: err })
	}
}
