import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
import './RegistrationForm.scss'

import { Form, Input, Button, message } from 'antd'

const cookies = new Cookies()

const formLayout = {
	labelCol: {
		span: 8
	},
	wrapperCol: {
		span: 14
	},
	style: { paddingTop: '1rem' }
}

const formTailLayout = {
	wrapperCol: { offset: 18, span: 6 }
}

class RegistrationForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			ready: false
		}
	}

	handleSaveInputToState = (event) => {
		this.setState({ [event.target.id]: event.target.value })
	}

	handleRegistration = async (event) => {
		const registrationCreds = {
			name: event.name ? event.name : null,
			email: event.email ? event.email : null,
			password: event.password ? event.password : null,
			confirmPassword: event.confirmPassword ? event.confirmPassword : null
		}

		const response = await fetch('/api/registerNewUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(registrationCreds)
		})
		const data = await response.json()
		if (response.status === 200) {
			cookies.set('name', data.name)
			cookies.set('tradingEnabled', data.tradingEnabled)
			window.location.reload()
		} else {
			message.error(data.message)
		}
	}

	render() {
		return (
			<div className="RegistrationForm">
				<Form className="form-section" {...formLayout} size={'small'} onFinish={this.handleRegistration}>
					<Form.Item
						className="form-group"
						label="Name"
						name="name"
						onChange={this.handleSaveInputToState}
						rules={[ { required: true, message: 'Name is required' } ]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						className="form-group"
						label="Email"
						name="email"
						onChange={this.handleSaveInputToState}
						rules={[ { type: 'email', message: 'Not a valid e-mail' }, { required: true, message: 'Email is required' } ]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						className="form-group"
						label="Password"
						name="password"
						onChange={this.handleSaveInputToState}
						hasFeedback
						rules={[
							{ required: true, message: 'Password is required' },
							() => ({
								validator(rule, value) {
									if (value.length >= 8) {
										return Promise.resolve()
									}
									return Promise.reject('Your password must be at least 8 chars')
								}
							})
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						className="form-group"
						label="Confirm Password"
						name="confirmPassword"
						onChange={this.handleSaveInputToState}
						dependencies={[ 'password' ]}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your password'
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve()
									}
									return Promise.reject('Your passwords must match')
								}
							})
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item {...formTailLayout}>
						<Button className="form-group" type="primary" size="medium" htmlType="submit">
							Sign Up
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}

export default withRouter(RegistrationForm)
