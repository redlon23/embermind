import React, { Component } from 'react'

import { Layout, Menu, Form, Input, Button, InputNumber } from 'antd'

const { Content, Sider } = Layout
class StrategySettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			displayCategory: 'basic',
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
			basic: this.basicSettingsFields
		}
	}

	numInputRegEx = (value) => value.replace(/[^0-9]/, '')
	numDecInputRegEx = (value) => value.replace(/[^0-9.]/g, '') // doesn't prevent multiple decimals

	handleSaveInputToState = (event) => {
		// Ensures only numbers and decimals are saved to state
		console.log(event.target.value)
		if (!isNaN(event.target.value[event.target.value.length - 1]) || event.target.value[event.target.value.length - 1] == '.') {
			this.setState({ [event.target.id]: event.target.value })
			console.log({ [event.target.id]: event.target.value })
		}
	}

	basicSettingsFields = (
		<div>
			<Form className="form-section">
				<Form.Item className="form-group" name="contractQuantity" label="Contract Quantity" onChange={this.handleSaveInputToState}>
					<InputNumber parser={this.numInputRegEx} />
				</Form.Item>
				<Form.Item className="form-group" name="takeProfit" label="Take Profit" onChange={this.handleSaveInputToState}>
					<InputNumber parser={this.numDecInputRegEx} />
				</Form.Item>
				<Form.Item className="form-group" name="quantity" label="Contract Quantity" onChange={this.handleSaveInputToState}>
					<InputNumber parser={this.numDecInputRegEx} />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
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
						<div className="site-layout-background" style={{ padding: 24, margin: 0, height: '28rem' }}>
							{this.displayOptions[this.state.displayCategory]}
						</div>
					</Content>
				</Layout>
			</div>
		)
	}
}

export default StrategySettingsForm
