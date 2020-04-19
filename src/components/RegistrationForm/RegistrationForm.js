import React, { Component } from 'react'

export default class RegistrationForm extends Component {
	submitHandler = async (event) => {
		event.preventDefault()

		const registrationCreds = {
			firstName: event.target.firstName.value ? event.target.firstName.value : null,
			lastName: event.target.lastName.value ? event.target.lastName.value : null,
			email: event.target.email.value ? event.target.email.value : null,
			password: event.target.password.value ? event.target.password.value : null,
			confirmPassword: event.target.confirmPassword.value ? event.target.confirmPassword.value : null
		}

		const credsValid = await this.validateRegistrationCreds(registrationCreds)
		if (credsValid === 'Creds Valid') {
			this.registerNewUser(registrationCreds)
		} else {
			console.log(credsValid)
		}
	}

	validateRegistrationCreds = async (registrationCreds) => {
		console.log(JSON.stringify(registrationCreds))
		for (const field of Object.values(registrationCreds)) {
			console.log(field)
			if (field === null) {
				return 'Fields cannot be empty'
			}
		}

		if (registrationCreds.password !== registrationCreds.confirmPassword) {
			return 'Passwords must match'
		}

		// TODO: Check if email already in DB
		// const emailExists = await fetch('/checkEmailExists') = {

		// }
		// if (emailExists) {
		//   return false
		// }

		return 'Creds Valid'
	}

	registerNewUser = async (registrationCreds) => {
		fetch('/api/registerNewUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(registrationCreds)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Data on the frontend: ' + JSON.stringify(data))
			})
			.catch((err) => console.log(err))
	}

	render() {
		return (
			<div className="regForm">
				<form className="signupModule" onSubmit={this.submitHandler}>
					<h2 id="slogan">
						<strong>Sign Up!</strong>
					</h2>
					<input
						className="inp_firstName"
						name="firstName"
						type="text"
						maxLength="40"
						placeholder="first name"
					/>
					<input
						className="inp_lastName"
						name="lastName"
						type="text"
						maxLength="40"
						placeholder="last name"
					/>
					<br />
					<input className="inp_email" name="email" type="text" maxLength="99" placeholder="email" />
					<br />
					<input
						className="inp_password"
						name="password"
						type="password"
						maxLength="40"
						placeholder="password"
					/>
					<br />
					<input
						className="inp_confirmPassword"
						name="confirmPassword"
						type="password"
						maxLength="40"
						placeholder="confirm password"
					/>
					<br />
					<input className="btn_signup" name="signup" type="submit" value="Sign Up" />
				</form>
			</div>
		)
	}
}
