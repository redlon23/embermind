import React, { Component } from 'react'
import './LandingPageHeader.css'

import { Layout, Button, Form, Input } from 'antd'
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
			if (data.status === 200) {
				window.location.reload()
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
				<Layout>
					<Header className="landingPageHeader">
						<Form name="horizontal_login" layout="inline" onFinish={this.handleLogin}>
							<Form.Item name="email" rules={[ { required: true, message: 'Please input your email!' } ]}>
								<Input placeholder="Email" />
							</Form.Item>
							<Form.Item name="password" rules={[ { required: true, message: 'Please input your password!' } ]}>
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
