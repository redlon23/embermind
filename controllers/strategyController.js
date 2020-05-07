const strategyModel = require('../models/strategyModels')

exports.getAllStrategiesInfo = async (req, res) => {
	try {
		const result = await strategyModel.getAllStrategiesInfo()
		res.status(200).send(result)
	} catch (err) {
		res.status(500).send({ message: err })
	}
}
