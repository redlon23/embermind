const UserStrategySetting = require('./schemas/userStrategySetting');
const TradeLog = require('./schemas/tradeLog');

exports.insertStrategySetting = async (req) => {
    var stratSetting = new UserStrategySetting(req);
	try{
		var result = await stratSetting.save();
	} catch(error){
		if(error.name === "ValidationError"){
			result = null
		}
	} finally{
		return result
	}
};

exports.updateStrategySetting = async (userId, req) => {
	try{
		console.log("here")
		console.log(req)
        var result = await UserStrategySetting.update({ userId: userId},//, strategyId: req.strategyId }, 
            { $set:{ 
				//contractQuantity: req.contractQuantity,
				userId: userId,
                takeProfit: req.takeProfit,
                //tradeInterval: req.tradeInterval,
                //maxContractSize: req.maxContractSize,
                //DCA: req.DCA,
                //numOrders: req.numOrders,
                //spread: req.spread,
                //orderSpread: req.orderSpread,
                //trailingSafety: req.trailingSafety,
                //trailingStop: req.trailingStop,
                //noTradingZoneSize: req.noTradingZoneSize,
                //noTradingZoneRange: req.noTradingZoneRange
				}}, { upsert: true }).exec();
				console.log(result)
	} catch(err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}

exports.getStrategySetting = async (req) => {
	try{
		var result = await TradeLog.findOne({userId: req.userId, strategyId: req.strategyId});
	} catch(err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}

exports.getTradeLogs = async (req) => {
	try{
		var result = await TradeLog.find({userId: req.userId}).toArray();
	} catch(err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}