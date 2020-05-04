import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Form, Input, Button } from 'antd'

const contentStyle = {
	background: '#1A1C25',
	width: '26rem',
	height: '20rem',
	fontSize: '16pt',
	padding: '1rem',
	color: '#EBEBEB'
}

const formLayout = {
	labelCol: {
		span: 8
	},
	wrapperCol: {
		span: 16
	},
	style: { paddingTop: '1rem' }
}

const formTailLayout = {
	wrapperCol: { offset: 19, span: 5 }
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
		try {
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
		return (
			<div className="registrationForm" style={{ ...contentStyle }}>
				Create a New Account!
				<Form className="form-section" {...formLayout} size={'small'} onFinish={this.handleRegistration}>
					<Form.Item className="form-group" label="Name" name="name" onChange={this.handleSaveInputToState}>
						<Input />
					</Form.Item>

					<Form.Item className="form-group" label="Email" name="email" onChange={this.handleSaveInputToState}>
						<Input />
					</Form.Item>

					<Form.Item className="form-group" label="Password" name="password" onChange={this.handleSaveInputToState}>
						<Input.Password />
					</Form.Item>

					<Form.Item className="form-group" label="Confirm Password" name="confirmPassword" onChange={this.handleSaveInputToState}>
						<Input.Password />
					</Form.Item>

					<Form.Item {...formTailLayout}>
						<Button className="form-group" type="primary" size="medium" htmlType="submit">
							Sign Up
						</Button>
					</Form.Item>
				</Form>
			</div>
			// <div className="regForm">
			// 	<form className="signupModule" onSubmit={this.handleRegistration}>
			// 		<h2 id="slogan">
			// 			<strong>Sign Up!</strong>
			// 		</h2>
			// 		<input className="inp_name" name="name" type="text" maxLength="40" placeholder="name" />
			// 		<br />
			// 		<input className="inp_email" name="email" type="text" maxLength="99" placeholder="email" />
			// 		<br />
			// 		<input className="inp_password" name="password" type="password" maxLength="40" placeholder="password" />
			// 		<br />
			// 		<input className="inp_confirmPassword" name="confirmPassword" type="password" maxLength="40" placeholder="confirm password" />
			// 		<br />
			// 		<input className="btn_signup" name="signup" type="submit" value="Sign Up" />
			// 	</form>
			// </div>
		)
	}
}

export default withRouter(RegistrationForm)
