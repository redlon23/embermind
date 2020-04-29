import React, { Component } from 'react'
import LandingPageHeader from './modules/LandingPageHeader.js'
import RegistrationForm from './modules/RegistrationForm.js'

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
				<LandingPageHeader {...this.props} />
				<button className="button" onClick={() => this.setState({ showRegForm: true })}>
					Register
				</button>
				{this.state.showRegForm ? <RegistrationForm /> : null}
			</div>
		)
	}
}

export default LandingPage
