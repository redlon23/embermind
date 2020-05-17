const strategyModel = require('../models/strategyModels')

exports.getAllStrategiesInfo = async (req, res) => {
	try {
		const result = await strategyModel.getAllStrategiesInfo()
		res.status(200).send(result)
	} catch (err) {
		console.error(err)
		res.status(500).send()
	}
}

exports.setUserStrategyRating = async (req, res) => {
	try {
		// Using == instead of === on purpose to change 0 ratings to null on purpose -- don't change
		const userRating = req.query.userRating == 0 ? null : req.query.userRating
		const newRating = await strategyModel.setUserStrategyRating({ userId: req.session.userId, userRating: userRating })
		res.status(200).send({ userRating: newRating, message: 'Rating set successfully' })
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'Error Setting Rating' })
	}
}
