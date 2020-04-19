import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import './LandingPage.css'

class LandingPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showRegForm: false
		}
	}

	render() {
		return (
			<div className="LandingPage">
				<h1>Landing Page</h1>
				<button className="button" onClick={() => this.setState({ showRegForm: true })}>
					Register
				</button>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Login
				</button>
				{this.state.showRegForm ? <RegistrationForm /> : null}
			</div>
		)
	}
}

export default LandingPage
