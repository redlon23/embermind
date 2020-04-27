import React, { Component } from 'react'

import { Form, Input, Button } from 'antd'

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

const tailLayout = {
	wrapperCol: { offset: 18, span: 1 }
}

class UserSettingsForm extends Component {
	render() {
		return (
			<div style={{ ...contentStyle }}>
				User Settings
				<Form className="form-section" {...layout} size={'small'}>
					<Form.Item className="form-group" label="Name" name="Name" rules={[ { required: true } ]}>
						<Input />
					</Form.Item>

					<Form.Item className="form-group" label="Email" name="Email" rules={[ { required: true } ]}>
						<Input />
					</Form.Item>

					<Form.Item className="form-group" label="Password" name="Password" rules={[ { required: true } ]}>
						<Input.Password />
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button className="form-group" type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}

export default UserSettingsForm
