import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SettingFields from './settingsFields'
// import CoinSelector from './CoinSelector'

import { Layout, Menu, Form, Button, InputNumber, Row, Col, message } from 'antd'

const { Content, Sider } = Layout

const layout = {
	labelCol: {
		span: 9
	},
	wrapperCol: {
		span: 15
	},
	style: { paddingTop: '1rem', paddingLeft: 0 }
}

const tailLayout = {
	wrapperCol: { offset: 20, span: 7 }
}

const fieldStyle = { width: '15rem' }

const numIntInputRegEx = (value) => value.replace(/[^0-9]/, '')
const numDecInputRegEx = (value) => value.replace(/[^0-9.]/g, '') // doesn't prevent multiple decimals
const camelToTitle = (camelCase) => camelCase.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase())

export const quantity = (context) => (
	<Form.Item className="form-group" name="quantity" label="Contract Quantity" key="quantity" onChange={context.handleSaveInputToState}>
		<InputNumber parser={numIntInputRegEx} style={fieldStyle} />
	</Form.Item>
)

export const takeProfit = (context) => (
	<Form.Item className="form-group" name="takeProfit" label="Take Profit" key="takeProfit" onChange={context.handleSaveInputToState}>
		<InputNumber placeholder={context.props.strategySettings.takeProfit} parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)

export const stopLoss = (context) => (
	<Form.Item className="form-group" name="stopLoss" label="Stop Loss" key="stopLoss" onChange={context.handleSaveInputToState}>
		<InputNumber parser={numDecInputRegEx} style={fieldStyle} />
	</Form.Item>
)
