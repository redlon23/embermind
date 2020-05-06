import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Button, Space } from 'antd'

const componentStyle = {
	background: '#1A1C25',
	height: '17rem',
	fontSize: '16pt',
	padding: '1rem',
	color: '#EBEBEB'
}

const featureText = {
	color: '#3FB2FF',
	fontSize: '15pt',
	textAlign: 'right',
	marginTop: '0.6rem'
}

const handleNewSubscription = async () => {
	const response = await fetch('/api/purchaseSubscription')
	const data = await response.json()
	if (response.status === 200) {
		console.log(JSON.stringify(data.message))
	} else {
		console.log(JSON.stringify(data.message))
	}
}

const toggleAutoRenew = () => {
	console.log('toggling auto-reneew')
}

class PurchaseSubscription extends Component {
	buttonsActiveSub = () => (
		<Space>
			<Button type="dashed" ghost size="medium" onClick={toggleAutoRenew}>
				{this.props.isRecurring ? 'Auto-Renew Off' : 'Auto-Renew On'}
			</Button>
			<Button type="primary" size="medium" onClick={handleNewSubscription}>
				Unsubscribe
			</Button>
		</Space>
	)

	buttonsInactiveSub = () => (
		<Space>
			<Button type="primary" size="medium" onClick={handleNewSubscription}>
				Subscribe
			</Button>
		</Space>
	)

	render() {
		return (
			<div className="PurchaseSubscription" style={componentStyle}>
				<Row gutter={[ 10, 18 ]}>
					<Col span={12}>
						Purchase Subscription
						<Row justify="end" style={{ marginTop: '1rem', marginRight: '2.5rem' }}>
							<Row style={featureText}>• Only $30/month</Row>
							<Row style={featureText}>• Total Access</Row>
							<Row style={featureText}>• Unlimited Positions</Row>
						</Row>
					</Col>
					<Col span={12} style={{ padding: 0 }}>
						<img className="logoNoClick" src={process.env.PUBLIC_URL + 'logo.png'} alt="EmberMind" style={{ maxWidth: '13rem' }} />
					</Col>
				</Row>
				<Row justify="end">{this.props.subStatus === 'Active' ? this.buttonsActiveSub() : this.buttonsInactiveSub()}</Row>
			</div>
		)
	}
}

export default withRouter(PurchaseSubscription)
