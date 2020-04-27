const User = require('../models/userStrategySetting');

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

exports.updateStrategySetting = async (req) => {
	try{
        var result = UserStrategySetting.update({ userId: req.userId, strategyId: req.strategyId }, 
            { $set:{ 
                contractQuantity: req.contractQuantity,
                takeProfit: req.takeProfit,
                tradeInterval: req.tradeInterval,
                maxContractSize: req.maxContractSize,
                DCA: req.DCA,
                numOrders: req.numOrders,
                spread: req.spread,
                orderSpread: req.orderSpread,
                trailingSafety: req.trailingSafety,
                trailingStop: req.trailingStop,
                noTradingZoneSize: req.noTradingZoneSize,
                noTradingZoneRange: req.noTradingZoneRange
                }}).exec();
	} catch(err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}