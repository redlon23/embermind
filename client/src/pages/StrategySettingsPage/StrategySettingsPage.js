import React, { Component } from 'react'
import './StrategySettingsPage.css'

class StrategySettingsPage extends Component {
	render() {
		return (
			<div className="StrategySettingsPage">
				<h1>Strategy Settings</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Dashboard
				</button>
			</div>
		)
	}
}

export default StrategySettingsPage
