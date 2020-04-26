import React, { Component } from 'react'
import './AccountSettingsPage.css'

class AccountSettingsPage extends Component {
	render() {
		return (
			<div className="AccountSettingsPage">
				<h1>Account Settings</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Dashboard
				</button>
			</div>
		)
	}
}

export default AccountSettingsPage
