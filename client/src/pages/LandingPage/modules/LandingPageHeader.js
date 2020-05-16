import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import './LandingPageHeader.scss'

import { Button, Form, Input, message } from 'antd'

const cookies = new Cookies()

class LandingPageHeader extends Component {
	handleLogin = async (event) => {
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
			<div className="landingPageHeader">
				<img
					className="logo"
					src={`${process.env.PUBLIC_URL}logo-text.png`}
					alt="EmberMind"
					onClick={() => this.props.history.push('/dashboard')}
				/>
				<div className="loginFormContainer">
					<Form name="horizontal_login" layout="inline" size="small" onFinish={this.handleLogin}>
						<Form.Item name="email">
							<Input placeholder="Email" />
						</Form.Item>
						<Form.Item name="password">
							<Input type="password" placeholder="Password" />
						</Form.Item>
						<Form.Item shouldUpdate={true}>
							{() => (
								<Button className="loginButton" type="link" htmlType="submit">
									Log In
								</Button>
							)}
						</Form.Item>
					</Form>
				</div>
			</div>
		)
	}
}

export default LandingPageHeader
