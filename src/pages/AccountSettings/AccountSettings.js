import React, { Component } from 'react'
import './AccountSettings.css'

class AccountSettings extends Component {
	render() {
		return (
			<div className="AccountSettings">
				<h1>Account Settings</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Dashboard
				</button>
			</div>
		)
	}
}

export default AccountSettings
