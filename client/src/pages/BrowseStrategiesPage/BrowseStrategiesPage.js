import React, { Component } from 'react'
import './BrowseStrategiesPage.css'

class BrowseStrategiesPage extends Component {
	render() {
		return (
			<div className="BrowseStrategiesPage">
				<h1>Browse Strategies</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Dashboard
				</button>
			</div>
		)
	}
}

export default BrowseStrategiesPage
