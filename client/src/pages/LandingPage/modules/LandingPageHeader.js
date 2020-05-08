import React, { Component } from 'react'
import './LandingPageHeader.css'

import { Layout, Button, Form, Input, message } from 'antd'
const { Header } = Layout

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
		if (response.status === 200) {
			window.location.reload()
		} else {
			const data = await response.json()
			message.error(data.message)
		}
	}

	render() {
		return (
			<div>
				<Layout>
					<Header className="landingPageHeader">
						<Form name="horizontal_login" layout="inline" size="small" onFinish={this.handleLogin}>
							<Form.Item name="email">
								<Input placeholder="Email" />
							</Form.Item>
							<Form.Item name="password">
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
			</div>
		)
	}
}

export default LandingPageHeader
