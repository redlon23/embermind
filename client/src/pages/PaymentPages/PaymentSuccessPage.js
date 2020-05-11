import React, { Component } from 'react'
import './PaymentPages.css'

class PaymentSuccessPage extends Component {
	render() {
		return (
			<div className="PaymentSuccessPage">
				<h1>Payment Successful</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Go Back
				</button>
			</div>
		)
	}
}

export default PaymentSuccessPage
