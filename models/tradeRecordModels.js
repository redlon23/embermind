const DailyRecord = require('./schemas/dailyRecord')
const WeeklyRecord = require('./schemas/weeklyRecord')
const MonthlyRecord = require('./schemas/monthlyRecord')
const MinuteRecord = require('./schemas/minuteRecord')
const util = require('util')

exports.getMinuteRecord = async (userId) => {
	try {
		var result = await MinuteRecord.findOne({userId: userId}, {sort: {date: -1}});
	} catch (err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}

exports.getDailyRecords = async (userId) => {
	try {
		var result = await DailyRecord.find({userId: userId}, {sort: {date: -1}});
	} catch (err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}

exports.getWeeklyRecords = async (userId) => {
	try {
		var result = await WeeklyRecord.find({userId: userId}, {sort: {date: -1}});
	} catch (err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}

exports.getMonthlyRecords = async (userId) => {
	try {
		var result = await MonthlyRecord.find({userId: userId}, {sort: {date: -1}});
	} catch (err) {
		console.log(err);
		result = null;
	} finally {
		return result;
	}
}
