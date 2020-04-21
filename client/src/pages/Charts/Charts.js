import React, { Component } from 'react'
import './Charts.css'

class Charts extends Component {
	render() {
		return (
			<div className="Charts">
				<h1>Charts</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Dashboard
				</button>
			</div>
		)
	}
}

export default Charts
