import React, { Component } from 'react'
import { Row, Col, Button, Space } from 'antd'

const componentStyle = {
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
	console.log('handling new subscription!')
}

const toggleAutoRenew = () => {
	console.log('toggling auto-reneew')
}

class PurchaseSubscription extends Component {
	buttonsActiveSub = (
		<Space>
			<Button type="dashed" ghost size="medium" onClick={toggleAutoRenew}>
				{this.props.isRecurring ? 'Auto-Renew Off' : 'Auto-Renew On'}
			</Button>
			<Button type="primary" size="medium" onClick={handleNewSubscription}>
				Unsubscribe
			</Button>
		</Space>
	)

	buttonsInactiveSub = (
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
				<Row justify="end">{this.props.subStatus === 'Active' ? this.buttonsActiveSub : this.buttonsInactiveSub}</Row>
			</div>
		)
	}
}

export default PurchaseSubscription
