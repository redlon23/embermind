import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { takeProfit, quantity, stopLoss } from './settingsFields'
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

const requiredSettingsFields = (context) => (
	<div>
		<Row>
			<Col span={12}>
				<Form className="form-section" {...layout} initialValues={context.state} onFinish={context.updateStrategySettings}>
					{context.requiredSettings.map((settingName, index) => context.renderSetting[settingName])}
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

const optionalSettingsFields = (context) => (
	<Form className="form-section" {...layout} initialValues={context.state} onFinish={context.updateStrategySettings}>
		{context.optionalSettings.map(
			(settingName, index) =>
				index % 2 === 0
					? settingRow(context, settingName, context.optionalSettings[index + 1] ? context.optionalSettings[index + 1] : null, index)
					: null
		)}
		{context.optionalSettings.length > 0 ? (
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
			displayCategory: 'required',
			renderDataLoaded: false
			// supportedCoins: [],
			// selectedCoins: []
		}

		this.requiredSettings = this.props.strategySettings.requiredSettings
		this.optionalSettings = this.props.strategySettings.optionalSettings

		this.displayOptions = {
			required: requiredSettingsFields,
			optional: optionalSettingsFields
		}

		this.renderSetting = {
			quantity: quantity(this),
			takeProfit: takeProfit(this),
			stopLoss: stopLoss(this)
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
							<Menu theme="dark" mode="inline" defaultSelectedKeys={[ 'required' ]}>
								<Menu.Item key="required" onClick={() => this.setState({ displayCategory: 'required' })}>
									Required
								</Menu.Item>
								<Menu.Item key="optional" onClick={() => this.setState({ displayCategory: 'optional' })}>
									Optional
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
