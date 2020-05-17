import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col } from 'antd'
import './SubscriptionDetails.scss'

class SubscriptionDetails extends Component {
	constructor(props) {
		super(props)

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
			<div className="SubscriptionDetails">
				Subscription Details
				<div style={{ padding: '2rem' }}>
					<Row gutter={[ 10, 18 ]}>
						<Col className="categoryColumn" span={12}>
							Subscription Type:
						</Col>
						<Col className="valueColumn" span={12}>
							{this.props.subscriptionType}
						</Col>
					</Row>
					<Row gutter={[ 10, 12 ]}>
						<Col className="categoryColumn" span={12}>
							Expires:
						</Col>
						<Col className="valueColumn" span={12}>
							{this.state.expBillDateText}
						</Col>
					</Row>
					<Row gutter={[ 10, 6 ]}>
						<Col className="categoryColumn" span={12}>
							Recurring Monthly:
						</Col>
						<Col className="valueColumn" span={12}>
							{this.state.isRecurringText}
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default SubscriptionDetails
