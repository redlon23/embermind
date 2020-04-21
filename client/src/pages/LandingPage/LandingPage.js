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

	loginHandler = async (event) => {
		event.preventDefault()

		try {
			const loginCreds = {
				email: event.target.email.value ? event.target.email.value : null,
				password: event.target.password.value ? event.target.password.value : null
			}

			const response = await fetch('./api/loginUser', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(loginCreds)
			})
			const data = await response.json()
			if (data.status === 200) {
				this.props.history.push('./dashboard')
			} else {
				//TODO: Prompt use to retry creds
				console.log('Invalid Credentials')
			}
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		return (
			<div className="LandingPage">
				<h1>Landing Page</h1>
				<div className="regLoginButtons">
					<button className="button" onClick={() => this.setState({ showRegForm: true })}>
						Register
					</button>
					<form className="loginForm" onSubmit={this.loginHandler}>
						<button className="button" type="submit">
							Login
						</button>
						<input className="inp_email" name="email" type="text" maxLength="99" placeholder="email" />
						<input
							className="inp_password"
							name="password"
							type="text"
							maxLength="40"
							placeholder="password"
						/>
					</form>
				</div>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					(DEV skip login)
				</button>
				{this.state.showRegForm ? <RegistrationForm /> : null}
			</div>
		)
	}
}

export default LandingPage
