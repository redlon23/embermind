import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import './NotFoundPage.css'

class NotFoundPage extends Component {
	constructor(props) {
		super(props)
		this.state = { hasSession: false }
	}

	async componentDidMount() {
		const result = await validateSessionStatus()
		this.setState(result)
	}

	render() {
		return (
			<div className="NotFoundPage">
				<h1>404 Not Found</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Go Back
				</button>
			</div>
		)
	}
}

export default NotFoundPage
