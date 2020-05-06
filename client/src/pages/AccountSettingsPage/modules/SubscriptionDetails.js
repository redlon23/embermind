import React, { Component } from 'react'
import { Row, Col } from 'antd'

const contentStyle = {
	background: '#1A1C25',
	height: '17rem',
	fontSize: '16pt',
	padding: '1rem',
	color: '#EBEBEB'
}

const categoryStyle = {
	color: '#bfbfbf',
	fontSize: '14pt'
}

const valueStyle = {
	backgroundColor: '#1D222C',
	fontSize: '14pt'
}

class SubscriptionDetails extends Component {
	render() {
		return (
			<div className="SubscriptionModule" style={contentStyle}>
				Subscription Details
				<div style={{ padding: '2rem' }}>
					<Row gutter={[ 10, 18 ]}>
						<Col span={12} style={categoryStyle}>
							Subscription Status:
						</Col>
						<Col span={12} style={valueStyle}>
							{this.props.subscriptionType}
						</Col>
					</Row>
					<Row gutter={[ 10, 12 ]}>
						<Col span={12} style={categoryStyle}>
							Expiry/Billing Date:
						</Col>
						<Col span={12} style={valueStyle}>
							{this.props.expBillDate}
						</Col>
					</Row>
					<Row gutter={[ 10, 6 ]}>
						<Col span={12} style={categoryStyle}>
							Recurring Monthly:
						</Col>
						<Col span={12} style={valueStyle}>
							{this.props.isRecurring ? 'Yes' : 'No'}
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default SubscriptionDetails
