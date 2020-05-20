import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import renderSetting from './settingsFields'
// import CoinSelector from './CoinSelector'
import './StrategySettingsForm.scss'

import { Layout, Menu, Form, Button, Row, Col, message } from 'antd'

const { Content, Sider } = Layout

const layout = {
	labelCol: {
		offset: 2,
		span: 9
	},
	wrapperCol: {
		span: 15
	},
	style: { paddingTop: '1.5rem', paddingLeft: '10rem', paddingLeft: 0 }
}

const tailLayout = {
	wrapperCol: { offset: 20, span: 7 }
}

const requiredSettingsFields = (context) => (
	<div>
		<Row>
			<Col span={12}>
				<Form className="form-section" {...layout} initialValues={context.state} onFinish={context.updateStrategySettings}>
					{context.requiredSettings.map((settingName) => context.renderSetting[settingName])}
				</Form>
			</Col>
		</Row>

		<Row justify="end">
			<Button className="submitButton" type="primary" htmlType="submit" onClick={context.updateStrategySettings}>
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
				<Button className="submitButton" type="primary" htmlType="submit" onClick={context.updateStrategySettings}>
					Submit
				</Button>
			</Form.Item>
		) : null}
	</Form>
)

const settingRow = (context, settingName1, settingName2, index) => (
	<Row key={index}>
		<Col span={12}>{context.renderSetting[settingName1]}</Col>
		<Col span={10}>{settingName2 ? context.renderSetting[settingName2] : null}</Col>
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

		// Grabs field rendering object from settingFields.js
		this.renderSetting = renderSetting(this)
	}

	componentDidMount() {
		this.setState({ ...this.props.strategySettings, renderDataLoaded: true })
	}

	// componentDidUpdate() {
	// 	console.log('Selected Coins: ' + this.state.selectedCoins)
	// }

	handleSaveInputToState = (event) => {
		if (event.target.name) {
			event.target.id = event.target.name
		}

		if (event.target.value === '') {
			this.setState({ [event.target.id]: null })
		}

		if (
			typeof event.target.value === 'string' ||
			!isNaN(
				event.target.value[event.target.value.length - 1] ||
					(event.target.value[event.target.value.length - 1] === '.' && !this.state[event.target.id].includes('.'))
			)
		) {
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
			this.props.history.push('/')
			this.props.history.push('/strategy-settings')
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
					<Layout className="layout">
						<Sider className="sider">
							<Menu theme="dark" mode="inline" defaultSelectedKeys={[ 'required' ]}>
								<Menu.Item key="required" onClick={() => this.setState({ displayCategory: 'required' })}>
									Required
								</Menu.Item>
								<Menu.Item key="optional" onClick={() => this.setState({ displayCategory: 'optional' })}>
									Optional
								</Menu.Item>
							</Menu>
						</Sider>
						<Content className="content">{this.displayOptions[this.state.displayCategory](this)}</Content>
					</Layout>
				) : null}
			</div>
		)
	}
}

export default withRouter(StrategySettingsForm)
