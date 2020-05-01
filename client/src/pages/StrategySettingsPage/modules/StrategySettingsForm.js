import React, { Component } from 'react'
import CoinSelection from './CoinSelection'

import { Layout, Menu, Form, Button, InputNumber, Row, Col } from 'antd'

const { Content, Sider } = Layout

const layout = {
	labelCol: {
		span: 6
	},
	wrapperCol: {
		span: 16
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
			strategyId: '',
			strategyName: this.props.strategyName,
			displayCategory: 'basic',
			acceptedCoins: [ 'bitcoin', 'etherium', 'ripple' ],
			contractQuantity: '',
			DCA: '',
			maxContractSize: '',
			noTradingZoneSize: '',
			noTradingZoneRange: '',
			numOrders: '',
			orderSpread: '',
			spread: '',
			takeProfit: '',
			tradeInterval: '',
			trailingSafety: '',
			trailingStop: ''
		}

		this.displayOptions = {
			basic: this.basicSettingsFields()
		}
	}

	componentDidMount() {
		console.log('Populating state based on current strategy settings!')
		console.log('Rendering different option fields based on selected strategy name (or id)!')
	}

	numInputRegEx = (value) => value.replace(/[^0-9]/, '')
	numDecInputRegEx = (value) => value.replace(/[^0-9.]/g, '') // doesn't prevent multiple decimals

	handleSaveInputToState = (event) => {
		// Ensures only numbers and decimals are saved to state
		if (!isNaN(event.target.value[event.target.value.length - 1]) || event.target.value[event.target.value.length - 1] == '.') {
			this.setState({ [event.target.id]: event.target.value })
		}
	}

	handleSubmitUserSettings = async () => {
		console.log('Submitting User Settings!')
	}

	sendSelectionToParent = (coins) => {
		console.log('GOT EM: ' + coins)
	}

	basicSettingsFields = () => (
		<div>
			<Row>
				<Col span={12}>
					<Form className="form-section" {...layout} onFinish={this.handleSubmitStrategySettings}>
						<Form.Item className="form-group" name="contractQuantity" label="Contract Quantity" onChange={this.handleSaveInputToState}>
							<InputNumber parser={this.numInputRegEx} style={fieldStyle} />
						</Form.Item>
						<Form.Item className="form-group" name="takeProfit" label="Take Profit" onChange={this.handleSaveInputToState}>
							<InputNumber parser={this.numDecInputRegEx} style={fieldStyle} />
						</Form.Item>
						<Form.Item className="form-group" name="stopLoss" label="Stop Loss" onChange={this.handleSaveInputToState}>
							<InputNumber parser={this.numDecInputRegEx} style={fieldStyle} />
						</Form.Item>
					</Form>
				</Col>
				<Col span={12}>
					<Form.Item>
						<CoinSelection acceptedCoins={this.state.acceptedCoins} sendSelectionToParent={this.sendSelectionToParent.bind(this)} />
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</div>
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

export default StrategySettingsForm
