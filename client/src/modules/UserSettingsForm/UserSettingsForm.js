import React, { Component } from 'react'

import { Form, Input, Button } from 'antd'

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

const tailLayout = {
	wrapperCol: { offset: 17, span: 7 }
}

class UserSettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = { name: '', email: '', password: '' }

		this.handleSaveInputToState = this.handleSaveInputToState.bind(this)
		this.handleSubmitUserSettings = this.handleSubmitUserSettings.bind(this)
	}

	handleSaveInputToState(event) {
		this.setState({ [event.target.id]: event.target.value })
	}

	handleSubmitUserSettings() {
		// Make your requests to backend here:
		console.log(this.state.name + ' ' + this.state.email + ' ' + this.state.password)
	}

	render() {
		return (
			<div style={{ ...contentStyle }}>
				User Settings
				<Form className="form-section" {...layout} size={'small'} onFinish={this.handleSubmitUserSettings}>
					<Form.Item className="form-group" label="Name" name="name" rules={[ { required: true } ]} onChange={this.handleSaveInputToState}>
						<Input />
					</Form.Item>

					<Form.Item
						className="form-group"
						label="Email"
						name="email"
						rules={[ { required: true } ]}
						onChange={this.handleSaveInputToState}
					>
						<Input />
					</Form.Item>

					<Form.Item
						className="form-group"
						label="Password"
						name="password"
						rules={[ { required: true } ]}
						onChange={this.handleSaveInputToState}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button className="form-group" type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}

export default UserSettingsForm
