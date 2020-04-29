import React, { Component } from 'react'
import { Row, Col } from 'antd'

const contentStyle = {
	background: '#1A1C25',
	height: '17.5rem',
	fontSize: '16pt',
	padding: '1rem',
	color: '#EBEBEB'
}

const categoryStyle = {
	color: '#bfbfbf'
}

const valueStyle = {
	backgroundColor: '#1D222C'
}

class SubscriptionDetails extends Component {
	constructor(props) {
		super(props)

		this.state = { subStatus: 'Active', expBillDate: '20/12/01', isRecurring: true }
	}
	render() {
		return (
			<div className="SubscriptionDetails" style={contentStyle}>
				Subscription Details
				<div style={{ padding: '3rem' }}>
					<Row gutter={[ 10, 18 ]}>
						<Col span={10} style={categoryStyle}>
							Subscription Status:
						</Col>
						<Col span={10} style={valueStyle}>
							{this.state.subStatus}
						</Col>
					</Row>
					<Row gutter={[ 10, 12 ]}>
						<Col span={10} style={categoryStyle}>
							Expiry/Billing Date:
						</Col>
						<Col span={10} style={valueStyle}>
							{this.state.expBillDate}
						</Col>
					</Row>
					<Row gutter={[ 10, 6 ]}>
						<Col span={10} style={categoryStyle}>
							Recurring Monthly:
						</Col>
						<Col span={10} style={valueStyle}>
							{this.state.isRecurring ? 'Yes' : 'No'}
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default SubscriptionDetails
