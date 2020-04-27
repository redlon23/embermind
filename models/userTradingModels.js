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