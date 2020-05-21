import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Button, Space } from 'antd'
import './PurchaseSubscription.scss'

class PurchaseSubscription extends Component {
	devImmediateUnsubscribe = async () => {
		const response = await fetch('/api/endSubscription')
		const data = await response.json()
		if (response.status === 200) {
			console.log(JSON.stringify(data.message))
			this.props.history.push('/')
			this.props.history.push('/account-settings')
		} else {
			console.error(JSON.stringify(data.message))
		}
	}

	purchaseSubscription = async () => {
		const response = await fetch('/api/purchaseSubscription')
		const data = await response.json()
		if (response.status === 200) {
			window.location.href = data.paypalRedirectUrl
		} else {
			console.error(JSON.stringify(data.message))
		}
	}

	addPurchasedSubscriptionToDB = async () => {
		const response = await fetch('/api/addPurchasedSubscriptionToDB')
		const data = await response.json()
		if (response.status === 200) {
			console.log(JSON.stringify(data.message))
			this.props.history.push('/')
			this.props.history.push('/account-settings')
		} else {
			console.error(JSON.stringify(data.message))
		}
	}

	toggleAutoRenew = async () => {
		const response = await fetch('/api/toggleAutoRenew')
		const data = await response.json()
		if (response.status === 200) {
			console.log(JSON.stringify(data.message))
			this.props.history.push('/')
			this.props.history.push('/account-settings')
		} else {
			console.error(JSON.stringify(data.message))
		}
	}

	buttonsActiveSub = () => (
		<Space>
			<Button type="dashed" ghost size="medium" onClick={this.toggleAutoRenew}>
				{this.props.isRecurring ? 'Disable Auto-Renew' : 'Enable Auto-Renew'}
			</Button>
			<Button type="primary" size="medium" onClick={this.devImmediateUnsubscribe}>
				Dev Immediate Unsubscribe
			</Button>
		</Space>
	)

	buttonsInactiveSub = () => (
		<Space>
			<Button type="primary" size="medium" onClick={this.purchaseSubscription}>
				Subscribe
			</Button>
		</Space>
	)

	render() {
		return (
			<div className="PurchaseSubscription">
				<Row gutter={[ 10, 18 ]}>
					<Col span={12}>
						Purchase Subscription
						<Row className="featureContainer" justify="end">
							<Row className="featureText">• Only $30/month</Row>
							<br />
							<Row className="featureText">• Total Access</Row>
							<Row className="featureText">• Unlimited Positions</Row>
						</Row>
					</Col>
					<Col span={12} style={{ padding: 0 }}>
						<img className="logoNoClick" src={process.env.PUBLIC_URL + 'logo.png'} alt="EmberMind" />
					</Col>
				</Row>
				<Row style={{ marginTop: '1.7rem' }} justify="end">
					{this.props.subscribed === true ? this.buttonsActiveSub() : this.buttonsInactiveSub()}
				</Row>
			</div>
		)
	}
}

export default withRouter(PurchaseSubscription)
