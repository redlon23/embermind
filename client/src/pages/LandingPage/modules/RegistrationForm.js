import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class RegistrationForm extends Component {
	handleRegistration = async (event) => {
		try {
			event.preventDefault()

			const registrationCreds = {
				name: event.target.name.value ? event.target.name.value : null,
				email: event.target.email.value ? event.target.email.value : null,
				password: event.target.password.value ? event.target.password.value : null,
				confirmPassword: event.target.confirmPassword.value ? event.target.confirmPassword.value : null
			}

			const response = await fetch('/api/registerNewUser', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(registrationCreds)
			})
			const data = await response.json()
			if (data.status === 200) {
				console.log(JSON.stringify(data.message))
				window.location.reload()
			} else {
				//TODO: Prompt for correct input
			}
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		return (
			<div className="regForm">
				<form className="signupModule" onSubmit={this.handleRegistration}>
					<h2 id="slogan">
						<strong>Sign Up!</strong>
					</h2>
					<input className="inp_name" name="name" type="text" maxLength="40" placeholder="name" />
					<br />
					<input className="inp_email" name="email" type="text" maxLength="99" placeholder="email" />
					<br />
					<input className="inp_password" name="password" type="password" maxLength="40" placeholder="password" />
					<br />
					<input className="inp_confirmPassword" name="confirmPassword" type="password" maxLength="40" placeholder="confirm password" />
					<br />
					<input className="btn_signup" name="signup" type="submit" value="Sign Up" />
				</form>
			</div>
		)
	}
}

export default withRouter(RegistrationForm)
