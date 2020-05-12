import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './PaymentResultPage.css'

class PaymentResultPage extends Component {
	constructor(props) {
		super(props)
		this.state = { result: '', message: '', errorMessage: '', renderDataLoaded: false }
	}

	async componentDidMount() {
		const params = new URL(document.location).searchParams
		this.setState(
			{
				result: params.get('result'),
				message: params.get('message'),
				errorMessage: params.get('error-message')
			},
			() => {
				this.setState({ renderDataLoaded: true })

				// Redirect after 3 seconds
				console.log('RESULT: ' + this.state.result)
				if (this.state.result === 'success' || this.state.result === 'cancelled') {
					setTimeout(() => {
						console.log('GOINNNNGG')
						this.props.history.push('/account-settings')
					}, 3000)
				}
			}
		)
	}

	render() {
		return (
			<div className="PaymentResultPage">
				{this.state.renderDataLoaded ? (
					<div>
						<h1>PaymentResultPage</h1>
						<h2>{this.state.message}</h2>
						{this.state.result === 'failed' ? (
							<div>
								<h3>Error: {this.state.errorMessage}</h3>{' '}
								<button className="button" onClick={() => this.props.history.push('/dashboard')}>
									Go Back
								</button>
							</div>
						) : null}
						{this.state.result === 'success' ? (
							<div>
								<h1>Thanks!</h1>
							</div>
						) : null}
						<h3>Redirecting...</h3>
					</div>
				) : null}
			</div>
		)
	}
}

export default withRouter(PaymentResultPage)
