import React from 'react'
// import CoinSelector from './CoinSelector'

import { Form, InputNumber, Radio, Space, Tooltip } from 'antd'

const fieldStyle = { width: '15rem' }

const numIntInputRegEx = (value) => value.replace(/[^0-9]/, '')
const numDecInputRegEx = (value) => value.replace(/[^0-9.]/g, '') // doesn't prevent multiple decimals
const camelToTitle = (camelCase) => camelCase.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase())

const quantity = (context) => (
	<Form.Item
		className="form-group"
		name="quantity"
		label={
			<Tooltip placement="top" title="Strategy attempts to buy this quantity each time it trades">
				Quantity per Trade (BTC)
			</Tooltip>
		}
		key="quantity"
		onChange={context.handleSaveInputToState}
	>
		<InputNumber placeholder={'0.00000000'} parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)

const takeProfit = (context) => (
	<Form.Item
		className="form-group"
		name="takeProfit"
		label={
			<Tooltip placement="left" title="Strategy sells its holdings once it's achieved this amount profit">
				Take Profit (USD)
			</Tooltip>
		}
		key="takeProfit"
		onChange={context.handleSaveInputToState}
	>
		<InputNumber placeholder={'0'} parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)

const stopLoss = (context) => (
	<Form.Item
		className="form-group"
		name="stopLoss"
		label={
			<Tooltip placement="left" title="Strategy sells its holdings if this amount is lost">
				Stop Loss (USD)
			</Tooltip>
		}
		key="stopLoss"
		onChange={context.handleSaveInputToState}
	>
		<InputNumber placeholder={'0'} parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)

const rsiKLinePeriod = (context) => (
	<Form.Item
		className="form-group"
		name="rsiKlinePeriod"
		label={
			<Tooltip placement="left" title="How far back in time Strategy looks when determining whether coin is overbought or oversold">
				RSI K-Line Period
			</Tooltip>
		}
		key="rsiKlinePeriod"
		onChange={context.handleSaveInputToState}
	>
		<Radio.Group defaultValue="1m" buttonSyle="solid">
			<Space>
				<Radio.Button className="myButton" value="1m">
					1 Min
				</Radio.Button>
				<Radio.Button value="15m">15 Min</Radio.Button>
				<Radio.Button value="1h">1 Hour</Radio.Button>
			</Space>
		</Radio.Group>
	</Form.Item>
)

const rsiOverBought = (context) => (
	<Form.Item
		className="form-group"
		name="rsiOverBought"
		label={
			<Tooltip placement="left" title="RSI (Relative Strength Index) value at which strategy considers coin overbought">
				RSI Overbought (0-100)
			</Tooltip>
		}
		key="rsiOverBought"
		onChange={context.handleSaveInputToState}
	>
		<InputNumber placeholder={'70'} parser={numIntInputRegEx} style={fieldStyle} />
	</Form.Item>
)

const rsiOverSold = (context) => (
	<Form.Item
		className="form-group"
		name="rsiOverSold"
		label="RSI Oversold (0-100)"
		label={
			<Tooltip placement="left" title="RSI (Relative Strength Index) value at which strategy considers coin oversold">
				RSI Oversold (0-100)
			</Tooltip>
		}
		key="rsiOverSold"
		onChange={context.handleSaveInputToState}
	>
		<InputNumber placeholder={'30'} parser={numIntInputRegEx} style={fieldStyle} />
	</Form.Item>
)

// Fields we havn't customized yet get this generic field
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
