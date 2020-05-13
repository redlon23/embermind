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

const numIntInputRegEx = (value) => value.replace(/[^0-9]/, '')
const numDecInputRegEx = (value) => value.replace(/[^0-9.]/g, '') // doesn't prevent multiple decimals
const camelToTitle = (camelCase) => camelCase.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase())

const basicSettingsFields = (context) => (
	<div>
		<Row>
			<Col span={12}>
				<Form className="form-section" {...layout} initialValues={context.state} onFinish={context.updateStrategySettings}>
					<Form.Item className="form-group" name="quantity" label="Contract Quantity" onChange={context.handleSaveInputToState}>
						<InputNumber parser={numIntInputRegEx} style={fieldStyle} />
					</Form.Item>
					<Form.Item className="form-group" name="takeProfit" label="Take Profit" onChange={context.handleSaveInputToState}>
						<InputNumber placeholder={context.props.strategySettings.takeProfit} parser={numDecInputRegEx} style={fieldStyle} />
					</Form.Item>
					<Form.Item className="form-group" name="stopLoss" label="Stop Loss" onChange={context.handleSaveInputToState}>
						<InputNumber parser={numDecInputRegEx} style={fieldStyle} />
					</Form.Item>
				</Form>
			</Col>
		</Row>
		<Row justify="end">
			<Button type="primary" htmlType="submit" onClick={context.updateStrategySettings} style={{ marginRight: '6.2rem' }}>
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

const advancedSettingsFields = (context) => (
	<Form className="form-section" {...layout} initialValues={context.state} onFinish={context.updateStrategySettings}>
		{context.advancedSettings.map(
			(settingName, index) =>
				index % 2 === 0
					? settingRow(context, settingName, context.advancedSettings[index + 1] ? context.advancedSettings[index + 1] : null, index)
					: null
		)}
		{context.advancedSettings.length > 0 ? (
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit" onClick={context.updateStrategySettings}>
					Submit
				</Button>
			</Form.Item>
		) : null}
	</Form>
)

const settingRow = (context, settingName1, settingName2, index) => (
	<Row key={index}>
		<Col span={12}>
			<Form.Item
				className="form-group"
				name={settingName1}
				label={camelToTitle(settingName1)}
				key={settingName1}
				onChange={context.handleSaveInputToState}
			>
				<InputNumber parser={numIntInputRegEx} style={fieldStyle} />
			</Form.Item>
		</Col>
		<Col span={10}>
			{settingName2 ? (
				<Form.Item
					className="form-group"
					name={settingName2}
					label={camelToTitle(settingName2)}
					key={settingName2}
					onChange={context.handleSaveInputToState}
				>
					<InputNumber parser={numIntInputRegEx} style={fieldStyle} />
				</Form.Item>
			) : null}
		</Col>
	</Row>
)

class StrategySettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			displayCategory: 'basic',
			renderDataLoaded: false
			// supportedCoins: [],
			// selectedCoins: []
		}

		this.basicSettings = [ 'quantity', 'takeProfit', 'stopLoss' ]
		this.advancedSettings = this.props.strategySettings.supportedSettings
			.filter((setting) => {
				return !this.basicSettings.includes(setting)
			})
			.sort()

		this.displayOptions = {
			basic: basicSettingsFields,
			advanced: advancedSettingsFields
		}
	}

	componentDidMount() {
		this.setState({ ...this.props.strategySettings, renderDataLoaded: true })
	}

	// componentDidUpdate() {
	// 	console.log('Selected Coins: ' + this.state.selectedCoins)
	// }

	handleSaveInputToState = (event) => {
		// Ensures only null, numbers, or decimals are saved to state (need one for boolean?)
		if (event.target.value === '') {
			this.setState({ [event.target.id]: null })
		}

		if (!isNaN(event.target.value[event.target.value.length - 1]) || event.target.value[event.target.value.length - 1] === '.') {
			this.setState({ [event.target.id]: event.target.value })
		}
	}

	updateStrategySettings = async () => {
		const updatedSettings = this.state
		delete updatedSettings.displayCategory

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

	render() {
		return (
			<div className="StrategySettingsForm">
				{this.state.renderDataLoaded ? (
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
								{this.displayOptions[this.state.displayCategory](this)}
							</div>
						</Content>
					</Layout>
				) : null}
			</div>
		)
	}
}

export default withRouter(StrategySettingsForm)
