import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'

const contentStyle = {
	background: '#1A1C25',
	height: '17rem',
	fontSize: '16pt',
	padding: '1rem',
	color: '#EBEBEB'
}

const categoryStyle = {
	color: '#3FB2FF',
	fontSize: '14pt',
	textAlign: 'right',
	marginTop: '0.6rem'
}

const handleNewSubscription = () => {
	console.log('hello!')
}

class SubscribeModule extends Component {
	render() {
		return (
			<div className="SubscribeModule" style={contentStyle}>
				<Row gutter={[ 10, 18 ]}>
					<Col span={12}>
						Purchase Subscription
						<Row justify="end" style={{ marginTop: '1rem', marginRight: '2.5rem' }}>
							<Row style={categoryStyle}>• Only $30/month</Row>
							<Row style={categoryStyle}>• Total Access</Row>
							<Row style={categoryStyle}>• Unlimited Positions</Row>
						</Row>
					</Col>
					<Col span={12} style={{ padding: 0 }}>
						<img
							className="logo"
							src={process.env.PUBLIC_URL + 'logo.png'}
							alt="EmberMind"
							onClick={() => this.props.history.push('/dashboard')}
							style={{ maxWidth: '13rem' }}
						/>
					</Col>
				</Row>
				<Row justify="end">
					<Button type="primary" size="medium" onClick={handleNewSubscription}>
						Subscribe
					</Button>
				</Row>
			</div>
		)
	}
}

export default SubscribeModule
