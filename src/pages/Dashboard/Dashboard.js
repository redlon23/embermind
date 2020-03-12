import React, { Component } from 'react'
import './Dashboard.css'

class Dashboard extends Component {
	render() {
		return (
			<div className="Dashboard">
				<h1>Dashboard</h1>
				<button className="button" onClick={() => this.props.history.push('/')}>
					Logout
				</button>
				<button className="button" onClick={() => this.props.history.push('/account-settings')}>
					Account Settings
				</button>
				<button className="button" onClick={() => this.props.history.push('/charts')}>
					Charts
				</button>
				<button className="button" onClick={() => this.props.history.push('/signal-providers')}>
					Signal Providers
				</button>
				<button className="button" onClick={() => this.props.history.push('/signal-settings')}>
					Signal Settings
				</button>
			</div>
		)
	}
}

export default Dashboard
