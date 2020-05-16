import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import './UserSettingsForm.scss'

const layout = {
	labelCol: {
		span: 6
	},
	wrapperCol: {
		span: 16
	},
	style: { paddingTop: '1rem' }
}

const tailLayout = {
	wrapperCol: { offset: 21, span: 7 },
	style: { marginTop: '1.9rem' }
}

class UserSettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			ready: false
		}
		this.handleSaveInputToState = this.handleSaveInputToState.bind(this)
		this.handleSubmitUserSettings = this.handleSubmitUserSettings.bind(this)
	}

	async componentDidMount() {
		const response = await fetch('/api/getUserInfo')
		const json = await response.json()
		if (json) {
			this.setState({ name: json.name, email: json.email, ready: true })
		}
	}

	handleSaveInputToState(event) {
		this.setState({ [event.target.id]: event.target.value })
	}

	handleSubmitUserSettings = async () => {
		if (this.state.password && this.state.password !== this.state.confirmPassword) {
			console.log('Your passwords must match')
			return
		}

		try {
			const accountRequest = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password ? this.state.password : null
			}
			const response = await fetch('/api/updateAccount', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(accountRequest)
			})
			const data = await response.json()
			if (data.status === 200) {
				console.log(JSON.stringify(data.message))
				this.props.history.push('/')
				this.props.history.push('/account-settings')
			} else {
				//TODO: Prompt for correct input
			}
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		if (this.state.ready) {
			return (
				<div className="UserSettingForm">
					User Settings
					<Form className="form-section" {...layout} size={'small'} onFinish={this.handleSubmitUserSettings}>
						<Form.Item className="form-group" label="Name" name="name" onChange={this.handleSaveInputToState}>
							<Input placeholder={this.state.name} />
						</Form.Item>

						<Form.Item className="form-group" label="Email" name="email" onChange={this.handleSaveInputToState}>
							<Input placeholder={this.state.email} />
						</Form.Item>

						<Form.Item className="form-group" label="Password" name="password" onChange={this.handleSaveInputToState}>
							<Input.Password placeholder="*****************" />
						</Form.Item>

						<Form.Item className="form-group" label="Confirm Password" name="confirmPassword" onChange={this.handleSaveInputToState}>
							<Input.Password />
						</Form.Item>

						<Form.Item {...tailLayout}>
							<Button className="form-group" type="primary" size="medium" htmlType="submit">
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

export default withRouter(UserSettingsForm)
