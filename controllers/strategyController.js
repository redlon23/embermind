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
		const hasPreviouslyUsedStrategy = await strategyModel.hasPreviouslyUsedStrategy({
			userId: req.session.userId,
			strategyName: req.query.strategyName
		})
		if (!hasPreviouslyUsedStrategy) {
			res.status(405).send({ message: 'Must have equipped strategy at least once before rating possible' })
		} else {
			const oldUserRating = await strategyModel.isCurrentlyRatedByUser({
				userId: req.session.userId,
				strategyName: req.query.strategyName
			})

			// Using == instead of === on purpose to change 0 ratings to null on purpose -- don't change
			const userRating = req.query.userRating == 0 ? null : req.query.userRating
			const newRating = await strategyModel.setUserStrategyRating({
				userId: req.session.userId,
				strategyName: req.query.strategyName,
				userRating: userRating
			})

			newRatingCount = null
			// userRating going from null to a pos number = increment rating count
			if (!oldUserRating) {
				newRatingCount = await strategyModel.incrementStrategyRatingCount({ strategyName: req.query.strategyName })
			}

			// userRating going from pos number to null = decrement rating count
			if (oldUserRating) {
				newRatingCount = await strategyModel.decrementStrategyRatingCount({ strategyName: req.query.strategyName })
			}

			res.status(200).send({ userRating: newRating, ratingCount: newRatingCount, message: 'Rating set successfully' })
		}
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'Error Setting Rating' })
	}
}
