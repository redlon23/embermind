import React, { Component } from 'react'
import moment from 'moment'
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
	constructor(props) {
		super(props)
		console.log('PROPS: ' + JSON.stringify(props))

		let isRecurringText = 'N/A'
		if (this.props.subscribed) {
			isRecurringText = this.props.isRecurring ? 'Yes' : 'No'
		}

		this.state = {
			isRecurringText: isRecurringText,
			expBillDateText: this.props.expBillDate ? moment(this.props.expBillDate).format('MMMM / DD / YYYY') : 'N/A'
		}
	}
	render() {
		return (
			<div className="SubscriptionModule" style={contentStyle}>
				Subscription Details
				<div style={{ padding: '2rem' }}>
					<Row gutter={[ 10, 18 ]}>
						<Col span={12} style={categoryStyle}>
							Subscription Type:
						</Col>
						<Col span={12} style={valueStyle}>
							{this.props.subscriptionType}
						</Col>
					</Row>
					<Row gutter={[ 10, 12 ]}>
						<Col span={12} style={categoryStyle}>
							Expires:
						</Col>
						<Col span={12} style={valueStyle}>
							{this.state.expBillDateText}
						</Col>
					</Row>
					<Row gutter={[ 10, 6 ]}>
						<Col span={12} style={categoryStyle}>
							Recurring Monthly:
						</Col>
						<Col span={12} style={valueStyle}>
							{this.state.isRecurringText}
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default SubscriptionDetails
