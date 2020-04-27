import React, { Component } from 'react'
import './NotFoundPage.css'

class NotFoundPage extends Component {
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
