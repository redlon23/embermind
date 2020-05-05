import React, { Component } from 'react'
import './LandingPageHeader.css'

import { Layout, Button, Form, Input, message } from 'antd'
const { Header } = Layout

class LandingPageHeader extends Component {
	handleLogin = async (event) => {
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
			if (response.status === 200) {
				console.log(JSON.stringify(data.message))
				window.location.reload()
			} else {
				message.error(data.message)
			}
		} catch (err) {
			console.log(err)
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
