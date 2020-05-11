import React, { Component } from 'react'
import './PaymentPages.css'

class PaymentFailurePage extends Component {
	render() {
		return (
			<div className="PaymentFailurePage">
				<h1>Payment Failed</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Go Back
				</button>
			</div>
		)
	}
}

export default PaymentFailurePage
