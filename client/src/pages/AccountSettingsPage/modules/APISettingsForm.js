import React, { Component } from 'react'
import { Form, Input, Button, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'

const contentStyle = {
	background: '#1A1C25',
	height: '19rem',
	fontSize: '16.5pt',
	padding: '1rem',
	color: '#EBEBEB'
}

const layout = {
	labelCol: {
		span: 6
	},
	wrapperCol: {
		span: 16
	},
	style: { padding: '1rem' }
}

const tailLayout = {
	wrapperCol: { offset: 20, span: 7 },
	style: {
		marginTop: '4.4rem',
		marginBottom: '0'
	}
}

class APISettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = { publicApi: '', secretApi: '', exchange: '', ready2: false }

		this.handleSaveInputToState = this.handleSaveInputToState.bind(this)
		this.handleExchangeSelect = this.handleExchangeSelect.bind(this)
		this.handleSubmitAPISettings = this.handleSubmitAPISettings.bind(this)

		this.menu = (
			<Menu onClick={this.handleExchangeSelect}>
				<Menu.Item key="Binance">Binance</Menu.Item>
				<Menu.Item key="Bybit">Bybit</Menu.Item>
				<Menu.Item key="None">None</Menu.Item>
			</Menu>
		)
	}

	async componentDidMount() {
		const response = await fetch('/api/getUserInfo')
		const json = await response.json()
		if (json) {
			this.setState({ exchange: json.exchange, publicApi: json.publicAPI, secretApi: json.secretAPI, ready2: true })
		}
	}

	handleSaveInputToState(event) {
		this.setState({ [event.target.id]: event.target.value })
	}

	handleExchangeSelect({ key }) {
		this.setState({ exchange: key })
	}

	handleSubmitAPISettings = async (event) => {
		try {
			const setAPIRequest = {
				publicAPI: this.state.publicApi ? this.state.publicApi : null,
				secretAPI: this.state.secretApi ? this.state.secretApi : null,
				exchange: this.state.exchange ? this.state.exchange : null
			}
			const response = await fetch('/api/setAPIKeys', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(setAPIRequest)
			})
			const data = await response.json()
			if (data.status === 200) {
				console.log(JSON.stringify(data.message))
				window.location.reload()
			} else {
				//TODO: Prompt for correct input
			}
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		if (this.state.ready2) {
			return (
				<div style={{ ...contentStyle }}>
					API Settings
					<Form className="form-section" {...layout} size={'small'} onFinish={this.handleSubmitAPISettings}>
						<Form.Item className="form-group" label="Public API" name="publicApi" onChange={this.handleSaveInputToState}>
							<Input placeholder={this.state.publicApi} />
						</Form.Item>

						<Form.Item className="form-group" label="Secret API" name="secretApi" onChange={this.handleSaveInputToState}>
							<Input.Password placeholder={this.state.secretApi} />
						</Form.Item>

						<Form.Item className="form-group" label="Exchange" name="exchange" onChange={this.handleSaveInputToState}>
							<Dropdown overlay={this.menu}>
								<Button>
									{this.state.exchange}
									<DownOutlined />
								</Button>
							</Dropdown>
						</Form.Item>

						<Form.Item {...tailLayout}>
						  <Button type="primary" size="medium" htmlType="submit">
								Update
							</Button>
						</Form.Item>
					</Form>
				</div>
			)
		} else {
			return null
		}
	}
}

export default withRouter(APISettingsForm)
