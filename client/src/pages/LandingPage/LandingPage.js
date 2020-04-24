import React, { Component } from 'react'
import LandingPageHeader from '../../modules/LandingPageHeader/LandingPageHeader.js'

import './LandingPage.css'

class LandingPage extends Component {
	render() {
		return (
			<div className="LandingPage">
				<LandingPageHeader {...this.props} />
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					(DEV skip login)
				</button>
			</div>
		)
	}
}

export default LandingPage
