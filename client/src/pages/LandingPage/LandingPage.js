import React, { Component } from 'react'
import LandingPageHeader from './modules/LandingPageHeader.js'
import RegistrationForm from './modules/RegistrationForm.js'
import './LandingPage.css'

import { Modal, message } from 'antd'

message.config({
	duration: 2
})

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
		)
	}
}

export default LandingPage
