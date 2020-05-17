import React, { Component } from 'react'
import LandingPageHeader from './modules/LandingPageHeader.js'
import RegistrationForm from './modules/RegistrationForm.js'
import './LandingPage.scss'

import { Modal } from 'antd'

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
				<div className="heroSection">
					<div className="dashboardImg" />
					<div className="infoContainer">
						<h1>Automated Cryptocurrency Trading</h1>
						<h2>
							Made <b>Unreasonably</b> Simple
						</h2>
						<p>Our pre-developed strategies do the work for you so you can get back to achieving the life you deserve.</p>

						<button className="btnGetStarted" onClick={() => this.setState({ showRegForm: true })}>
							Get started free!
						</button>
					</div>
					{this.state.showRegForm ? (
						<Modal
							title="Create a New Account"
							visible={this.state.showRegForm}
							okText="Sign Up"
							footer={null}
							onOk={this.handleOk}
							onCancel={() => this.setState({ showRegForm: false })}
							bodyStyle={{ padding: 0 }}
							width="30rem"
						>
							<RegistrationForm />
						</Modal>
					) : null}
				</div>
			</div>
		)
	}
}

export default LandingPage
