import React, { Component } from 'react'
import './Dashboard.css'

import { Button } from 'antd'

class Dashboard extends Component {
	onPanelChange(value, mode) {
		console.log(value.format('YYYY-MM-DD'), mode)
	}

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
				<button className="button" onClick={() => this.props.history.push('/signal-providers')}>
					Signal Providers
				</button>
				<button className="button" onClick={() => this.props.history.push('/signal-settings')}>
					Signal Settings
				</button>
				<Button type="primary">Ant Test Button</Button>
			</div>
		)
	}
}

export default Dashboard
