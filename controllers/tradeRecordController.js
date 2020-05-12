const tradeRecordModels = require('../models/tradeRecordModels')

exports.getUnrealizedPnL = async (req, res) => {
	try {
        let result = await tradeRecordModels.getMinuteRecord(req.session.userId);
        if(result == undefined){
            result = [];
        }
        let {unrealizedPnL, date} = result;
        res.status(200).send({unrealizedPnL, date});
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'Error Finding Trade Record' })
	}
}

exports.getDailyPnL = async (req, res) => {
	try {
        let result = await tradeRecordModels.getDailyRecords(req.session.userId);
        if(result == undefined){
            result = [];
        }
        res.status(200).send(result);
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'Error Finding Trade Record' })
	}
}

exports.getWeeklyPnL = async (req, res) => {
	try {
        var result = await tradeRecordModels.getWeeklyRecords(req.session.userId);
        if(result == undefined){
            result = [];
        }
        res.status(200).send(result);
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'Error Finding Trade Record' })
	}
}

exports.getMonthlyPnL = async (req, res) => {
	try {
        var result = await tradeRecordModels.getMonthlyRecords(req.session.userId);
        if(result == undefined){
            result = [];
        }
        res.status(200).send(result);
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'Error Finding Trade Record' })
	}
}