import React, { Component } from 'react'
import './StrategyListingsPage.css'

class StrategyListingsPage extends Component {
	render() {
		return (
			<div className="StrategyListingsPage">
				<h1>Signal Providers</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Dashboard
				</button>
			</div>
		)
	}
}

export default StrategyListingsPage
