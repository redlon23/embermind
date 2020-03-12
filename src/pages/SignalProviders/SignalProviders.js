import React, { Component } from 'react'
import './SignalProviders.css'

class SignalProviders extends Component {
	render() {
		return (
			<div className="SignalProviders">
				<h1>Signal Providers</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Dashboard
				</button>
			</div>
		)
	}
}

export default SignalProviders
