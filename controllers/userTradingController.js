const userTradingModel = require('../models/userTradingModels')

exports.equipStrategy = async (req, res) => {
	try {
		await userTradingModel.equipStrategy({ userId: req.session.userId, strategyName: req.body.strategyName })
		res.status(200).send({ message: 'Strategy Equipped ' })
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'Error equipping strategy' })
	}
}

//TODO: Test when front end finished!
exports.newStrategySetting = async (req, res) => {
	const newSetting = await userTradingModel.insertStrategySetting(req.body)
	if (!newSetting) {
		res.send('settings not saved')
	}
	res.status(200).send({ status: 200, message: 'Strategy Setting Saved' })
}

exports.updateStrategySetting = async (req, res) => {
	const setting = await userTradingModel.updateStrategySetting(req.session.userId, req.body)
	if (!setting) {
		res.send('settings not saved')
	}
	res.status(200).send({ status: 200, message: 'Strategy Setting Updated' })
}

exports.getTradeLogs = async (req, res) => {
	const setting = await userTradingModel.getTradeLogs({ userId: req.session.userId })
	if (!setting) {
		res.send('settings not saved')
	}
	res.status(200).send({ status: 200, message: 'Strategy Setting Updated' })
}
