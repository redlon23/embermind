import React, { Component } from 'react'
import './PaymentPages.css'

class PaymentProcessingPage extends Component {
	async componentDidMount() {}

	render() {
		return (
			<div className="PaymentProcessingPage">
				<h1>Payment Processing...</h1>
				<button className="button" onClick={() => this.props.history.push('/payment-success')}>
					Success
				</button>
				<button className="button" onClick={() => this.props.history.push('/payment-failure')}>
					Failure
				</button>
			</div>
		)
	}
}

export default PaymentProcessingPage
