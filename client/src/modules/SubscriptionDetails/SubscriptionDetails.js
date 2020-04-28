import React, { Component } from 'react'
import { Row, Col } from 'antd'

const contentStyle = {
	background: '#1A1C25',
	height: '19.5rem',
	fontSize: '16pt',
	padding: '1rem',
	color: '#EBEBEB'
}

class SubscriptionDetails extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="SubscriptionDetails" style={contentStyle}>
				Subscription Details
				<div style={{ padding: '3rem' }}>
					<Row gutter={[ 10, 18 ]}>
						<Col span={10} style={{ color: '#bfbfbf' }}>
							Subscription Status:
						</Col>
						<Col span={10} style={{ backgroundColor: '#1D222C' }}>
							Inactive
						</Col>
					</Row>
					<Row gutter={[ 10, 12 ]}>
						<Col span={10} style={{ color: '#bfbfbf' }}>
							Expiry/Billing Date:
						</Col>
						<Col span={10} style={{ backgroundColor: '#1D222C' }}>
							20/12/12
						</Col>
					</Row>
					<Row gutter={[ 10, 6 ]}>
						<Col span={10} style={{ color: '#bfbfbf' }}>
							Recurring Monthly:
						</Col>
						<Col span={10} style={{ backgroundColor: '#1D222C' }}>
							Recurring Monthly
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default SubscriptionDetails
