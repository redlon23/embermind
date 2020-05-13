import React from 'react'
// import CoinSelector from './CoinSelector'

import { Form, InputNumber } from 'antd'

const fieldStyle = { width: '15rem' }

const numIntInputRegEx = (value) => value.replace(/[^0-9]/, '')
const numDecInputRegEx = (value) => value.replace(/[^0-9.]/g, '') // doesn't prevent multiple decimals
const camelToTitle = (camelCase) => camelCase.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase())

const quantity = (context) => (
	<Form.Item className="form-group" name="quantity" label="Contract Quantity" key="quantity" onChange={context.handleSaveInputToState}>
		<InputNumber parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)

const takeProfit = (context) => (
	<Form.Item className="form-group" name="takeProfit" label="Take Profit" key="takeProfit" onChange={context.handleSaveInputToState}>
		<InputNumber placeholder={context.props.strategySettings.takeProfit} parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)

const stopLoss = (context) => (
	<Form.Item className="form-group" name="stopLoss" label="Stop Loss" key="stopLoss" onChange={context.handleSaveInputToState}>
		<InputNumber parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)

const rsiKLinePeriod = (context) => (
	<Form.Item className="form-group" name="rsiKlinePeriod" label="RSI K-Line Period" key="rsiKlinePeriod" onChange={context.handleSaveInputToState}>
		<InputNumber parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)

const rsiOverBought = (context) => (
	<Form.Item className="form-group" name="rsiOverBought" label="RSI Overbought" key="rsiOverBought" onChange={context.handleSaveInputToState}>
		<InputNumber parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)

const rsiOverSold = (context) => (
	<Form.Item className="form-group" name="rsiOverSold" label="RSI Oversold" key="rsiOverSold" onChange={context.handleSaveInputToState}>
		<InputNumber parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)

const genericField = (context, settingName) => (
	<Form.Item
		className="form-group"
		name={settingName}
		label={camelToTitle(settingName)}
		key={settingName}
		onChange={context.handleSaveInputToState}
	>
		<InputNumber parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)

const renderSetting = (context) => {
	return {
		DCA: genericField(context, 'DCA'),
		maxContractSize: genericField(context, 'maxContractSize'),
		noTradingZoneSize: genericField(context, 'noTradingZoneSize'),
		noTradingZoneRange: genericField(context, 'noTradingZoneRange'),
		numOrders: genericField(context, 'numOrders'),
		orderSpread: genericField(context, 'orderSpread'),
		quantity: quantity(context),
		rsiKLinePeriod: rsiKLinePeriod(context),
		rsiOverBought: rsiOverBought(context),
		rsiOverSold: rsiOverSold(context),
		spread: genericField(context, 'spread'),
		stopLoss: stopLoss(context),
		takeProfit: takeProfit(context),
		tradeInterval: genericField(context, 'tradeInterval'),
		trailingSafety: genericField(context, 'trailingSafety'),
		trailingStop: genericField(context, 'trailingStop')
	}
}

export default renderSetting
