import React, { Component } from 'react'
import { Form, Input, Button, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

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

function handleButtonClick(e) {
	console.log('click left button', e)
}

function handleMenuClick(e) {
	console.log('click', e)
}

const menu = (
	<Menu onClick={handleMenuClick}>
		<Menu.Item key="1">Binance</Menu.Item>
		<Menu.Item key="2">Bybit</Menu.Item>
	</Menu>
)

class APISettingsForm extends Component {
	render() {
		return (
			<div style={{ ...contentStyle }}>
				API Settings
				<Form className="form-section" {...layout} size={'small'}>
					<Form.Item className="form-group" label="Public API" name="Public API">
						<Input />
					</Form.Item>

					<Form.Item className="form-group" label="Secret API" name="Secret API">
						<Input.Password />
					</Form.Item>

					<Form.Item className="form-group" label="Exchange" name="Exchange" placeholder="">
						<Dropdown overlay={menu}>
							<Button>
								Select<DownOutlined />
							</Button>
						</Dropdown>
					</Form.Item>

					<Form.Item>
						<Button className="form-group" type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}

export default APISettingsForm
