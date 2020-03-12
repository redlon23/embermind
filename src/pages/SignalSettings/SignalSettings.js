import React, { Component } from 'react'
import './SignalSettings.css'

class SignalSettings extends Component {
	render() {
		return (
			<div className="SignalSettings">
				<h1>Signal Settings</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Dashboard
				</button>
			</div>
		)
	}
}

export default SignalSettings
