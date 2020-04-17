import React, { Component } from 'react'
import './LandingPage.css'

class LandingPage extends Component {
	render() {
		return (
			<div className="LandingPage">
				<h1>Landing Page</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Register
				</button>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Login
				</button>
			</div>
		)
	}
}

export default LandingPage
