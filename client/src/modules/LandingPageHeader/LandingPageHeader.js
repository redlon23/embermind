import React, { Component } from 'react'
import RegistrationForm from '../RegistrationForm/RegistrationForm.js'
import './LandingPageHeader.css'

import { Layout, Button, Form, Input } from 'antd'
const { Header } = Layout

class LandingPageHeader extends Component {
	constructor(props) {
		super(props)
		console.log('HERE:' + JSON.stringify(this.props))
		this.state = {
			showRegForm: false
		}
	}

	loginHandler = async (event) => {
		console.log('EVENT: ' + JSON.stringify(event))

		try {
			const loginCreds = {
				email: event.email ? event.email : null,
				password: event.password ? event.password : null
			}

			const response = await fetch('./api/loginUser', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(loginCreds)
			})
			const data = await response.json()
			if (data.status === 200) {
				this.props.history.push('./dashboard')
			} else {
				//TODO: Prompt user to retry creds
				console.log('Invalid Credentials')
			}
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		return (
			<div>
				<h1> {'COOL THING: ' + document.cookie}</h1>
				{console.log('AHHH' + document.cookie)}
				<Layout>
					<Header className="landingPageHeader">
						<Form name="horizontal_login" layout="inline" onFinish={this.loginHandler}>
							<Form.Item name="email" rules={[ { required: true, message: 'Please input your email!' } ]}>
								<Input placeholder="Email" />
							</Form.Item>
							<Form.Item
								name="password"
								rules={[ { required: true, message: 'Please input your password!' } ]}
							>
								<Input type="password" placeholder="Password" />
							</Form.Item>
							<Form.Item shouldUpdate={true}>
								{() => (
									<Button type="primary" htmlType="submit">
										Log in
									</Button>
								)}
							</Form.Item>
						</Form>
					</Header>
				</Layout>
				<button className="button" onClick={() => this.setState({ showRegForm: true })}>
					Register
				</button>
				{this.state.showRegForm ? <RegistrationForm /> : null}
			</div>
			// <div>
			// 	<form className="loginForm" onSubmit={this.loginHandler}>
			// 		<button className="button" type="submit">
			// 			Login
			// 				</button>
			// 		<input className="inp_email" name="email" type="text" maxLength="99" placeholder="email" />
			// 		<input
			// 			className="inp_password"
			// 			name="password"
			// 			type="text"
			// 			maxLength="40"
			// 			placeholder="password"
			// 		/>
			// 	</form>
			// 	<Button className="button" onClick={() => this.setState({ showRegForm: true })}>
			// 		Register
			// 			</Button>
			// </div>
		)
	}
}

export default LandingPageHeader
