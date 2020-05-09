import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import CoinSelector from './CoinSelector'

import { Layout, Menu, Form, Button, InputNumber, Row, Col, message } from 'antd'

const { Content, Sider } = Layout

const layout = {
	labelCol: {
		span: 9
	},
	wrapperCol: {
		span: 15
	},
	style: { paddingTop: '1rem', paddingLeft: 0 }
}

const tailLayout = {
	wrapperCol: { offset: 20, span: 7 }
}

const fieldStyle = { width: '15rem' }

class StrategySettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			displayCategory: 'basic',
			supportedCoins: [],
			selectedCoins: []
		}

		this.basicSettings = [ 'contractQuantity', 'takeProfit', 'stopLoss' ]
		this.advancedSettings = this.props.strategySettings.supportedSettings
			.filter((setting) => {
				return !this.basicSettings.includes(setting)
			})
			.sort()

		this.displayOptions = {
			basic: this.basicSettingsFields(),
			advanced: this.advancedSettingsFields(this.advancedSettings)
		}
	}

	componentDidMount() {
		this.setState({ ...this.props.strategySettings })
	}

	// componentDidUpdate() {
	// 	console.log('Selected Coins: ' + this.state.selectedCoins)
	// }

	numIntInputRegEx = (value) => value.replace(/[^0-9]/, '')
	numDecInputRegEx = (value) => value.replace(/[^0-9.]/g, '') // doesn't prevent multiple decimals
	camelToTitle = (camelCase) => camelCase.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase())

	handleSaveInputToState = (event) => {
		// Ensures only numbers and decimals are saved to state
		if (!isNaN(event.target.value[event.target.value.length - 1]) || event.target.value[event.target.value.length - 1] === '.') {
			this.setState({ [event.target.id]: event.target.value })
		}
	}

	updateStrategySettings = async () => {
		const updatedSettings = {
			strategyName: this.state.strategyName,
			contractQuantity: this.state.contractQuantity,
			DCA: this.state.DCA,
			maxContractSize: this.state.maxContractSize,
			noTradingZoneSize: this.state.noTradingZoneSize,
			noTradingZoneRange: this.state.noTradingZoneRange,
			numOrders: this.state.numOrders,
			orderSpread: this.state.orderSpread,
			spread: this.state.spread,
			stopLoss: this.state.stopLoss,
			takeProfit: this.state.takeProfit,
			tradeInterval: this.state.tradeInterval,
			trailingSafety: this.state.trailingSafety,
			trailingStop: this.state.trailingStop
		}
		const response = await fetch('/api/updateStrategySettings', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedSettings)
		})
		const data = await response.json()
		if (response.status === 200) {
			message.success(data.message)
		} else {
			message.error(data.message)
		}
	}

	// updateSelectedCoins = (newCoins) => {
	// 	this.setState({ selectedCoins: newCoins })
	// }

	basicSettingsFields = () => (
		<div>
			<Row>
				<Col span={12}>
					<Form className="form-section" {...layout} onFinish={this.updateStrategySettings}>
						<Form.Item className="form-group" name="contractQuantity" label="Contract Quantity" onChange={this.handleSaveInputToState}>
							<InputNumber
								placeholder={this.props.strategySettings.contractQuantity}
								parser={this.numIntInputRegEx}
								style={fieldStyle}
							/>
						</Form.Item>
						<Form.Item className="form-group" name="takeProfit" label="Take Profit" onChange={this.handleSaveInputToState}>
							<InputNumber placeholder={this.props.strategySettings.takeProfit} parser={this.numDecInputRegEx} style={fieldStyle} />
						</Form.Item>
						<Form.Item className="form-group" name="stopLoss" label="Stop Loss" onChange={this.handleSaveInputToState}>
							<InputNumber placeholder={this.props.strategySettings.stopLoss} parser={this.numDecInputRegEx} style={fieldStyle} />
						</Form.Item>
					</Form>
				</Col>
			</Row>
			<Row justify="end">
				<Button type="primary" htmlType="submit" onClick={this.updateStrategySettings} style={{ marginRight: '6.2rem' }}>
					Submit
				</Button>
			</Row>
			{/*<Col span={12}>
				<Form.Item>
					<CoinSelector
						selectedCoins={this.state.selectedCoins}
						supportedCoins={this.state.supportedCoins}
						updateSelectedCoins={this.updateSelectedCoins.bind(this)}
					/>
				</Form.Item>
			</Col> */}
		</div>
	)

	advancedSettingsFields = (advancedSettings) => (
		<Form className="form-section" {...layout} onFinish={this.updateStrategySettings}>
			{advancedSettings.map(
				(settingName, index) =>
					index % 2 === 0 ? this.settingRow(settingName, advancedSettings[index + 1] ? advancedSettings[index + 1] : null, index) : null
			)}
			{advancedSettings.length > 0 ? (
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit" onClick={this.updateStrategySettings}>
						Submit
					</Button>
				</Form.Item>
			) : null}
		</Form>
	)

	settingRow = (settingName1, settingName2, index) => (
		<Row key={index}>
			<Col span={12}>
				<Form.Item
					className="form-group"
					name={settingName1}
					label={this.camelToTitle(settingName1)}
					key={settingName1}
					onChange={this.handleSaveInputToState}
				>
					<InputNumber placeholder={this.props.strategySettings[settingName1]} parser={this.numIntInputRegEx} style={fieldStyle} />
				</Form.Item>
			</Col>
			<Col span={10}>
				{settingName2 ? (
					<Form.Item
						className="form-group"
						name={settingName2}
						label={this.camelToTitle(settingName2)}
						key={settingName2}
						onChange={this.handleSaveInputToState}
					>
						<InputNumber placeholder={this.props.strategySettings[settingName2]} parser={this.numIntInputRegEx} style={fieldStyle} />
					</Form.Item>
				) : null}
			</Col>
		</Row>
	)

	render() {
		return (
			<div className="StrategySettingsForm">
				<Layout style={{ height: '28rem', marginTop: '0.5rem' }}>
					<Sider>
						<Menu theme="dark" mode="inline" defaultSelectedKeys={[ 'basic' ]}>
							<Menu.Item key="basic" onClick={() => this.setState({ displayCategory: 'basic' })}>
								Basic
							</Menu.Item>
							<Menu.Item key="advanced" onClick={() => this.setState({ displayCategory: 'advanced' })}>
								Advanced
							</Menu.Item>
						</Menu>
					</Sider>
					<Content>
						<div className="site-layout-background" style={{ paddingTop: 24, paddingBottom: 24, margin: 0, height: '28rem' }}>
							{this.displayOptions[this.state.displayCategory]}
						</div>
					</Content>
				</Layout>
			</div>
		)
	}
}

export default withRouter(StrategySettingsForm)
