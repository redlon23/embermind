import React, { Component } from 'react'
import { Form, Input, Button, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const contentStyle = {
	background: '#1A1C25',
	height: '19.5rem',
	fontSize: '16pt',
	padding: '1rem',
	color: '#EBEBEB'
}

const layout = {
	labelCol: {
		span: 4
	},
	wrapperCol: {
		span: 16
	},
	style: { padding: '1rem' }
}

class APISettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = { exchange: 'Submit' }
		this.handleExchangeSelect = this.handleExchangeSelect.bind(this)
		this.handleSubmitAPISettings = this.handleSubmitAPISettings.bind(this)

		this.menu = (
			<Menu onClick={this.handleExchangeSelect}>
				<Menu.Item key="Binance">Binance</Menu.Item>
				<Menu.Item key="Bybit">Bybit</Menu.Item>
			</Menu>
		)
	}

	handleExchangeSelect({ key }) {
		this.setState({ exchange: key })
	}

	handleSubmitAPISettings(event) {
		// Make your requests to backend here:
		console.log(event.publicApi + ' ' + event.secretApi + ' ' + (this.state.exchange === 'Submit' ? '' : this.state.exchange))
	}

	render() {
		return (
			<div style={{ ...contentStyle }}>
				API Settings
				<Form className="form-section" {...layout} size={'small'} onFinish={this.handleSubmitAPISettings}>
					<Form.Item className="form-group" label="Public API" name="publicApi">
						<Input />
					</Form.Item>

					<Form.Item className="form-group" label="Secret API" name="secretApi">
						<Input.Password />
					</Form.Item>

					<Form.Item className="form-group" label="Exchange" name="exchange">
						<Dropdown overlay={this.menu}>
							<Button>
								{this.state.exchange}
								<DownOutlined />
							</Button>
						</Dropdown>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}

export default APISettingsForm
