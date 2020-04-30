import React, { Component } from 'react'

import { Layout, Menu, Form, Input, Button } from 'antd'

const { Content, Sider } = Layout

class StrategySettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			category: 'basic'
		}

		this.settingsOptions = {
			basic: this.basicSettingsFields
		}
	}

	componentDidMount() {
		console.log('1: ' + this.state.category)
		console.log('2: ' + JSON.stringify(this.basicSettingsFields))
		console.log('3: ' + this.settingsOptions[this.state.category])
	}

	basicSettingsFields = (
		<div>
			<Form name="nest-messages">
				<Form.Item
					name={[ 'user', 'name' ]}
					label="Name"
					rules={[
						{
							required: true
						}
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)

	render() {
		return (
			<div>
				<Layout>
					<Sider>
						<div className="logo" />
						<Menu theme="dark" mode="inline" defaultSelectedKeys={[ 'basic' ]}>
							<Menu.Item key="basic" onClick={() => this.setState({ category: 'basic' })}>
								Basic
							</Menu.Item>
							<Menu.Item key="advanced" onClick={() => this.setState({ category: 'advanced' })}>
								Advanced
							</Menu.Item>
						</Menu>
					</Sider>
					<Content style={{ margin: '24px 16px 0' }}>
						<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
							{this.settingsOptions[this.state.category]}
						</div>
					</Content>
				</Layout>
			</div>
		)
	}
}

export default StrategySettingsForm
