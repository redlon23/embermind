import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Dashboard from './pages/Dashboard/Dashboard'
import AccountSettings from './pages/AccountSettingsPage/AccountSettingsPage'
import BrowseStrategiesPage from './pages/BrowseStrategiesPage/BrowseStrategiesPage'
import StrategySettingsPage from './pages/StrategySettingsPage/StrategySettingsPage'
import PaymentProcessingPage from './pages/PaymentPages/PaymentProcessingPage'
import PaymentSuccessPage from './pages/PaymentPages/PaymentSuccessPage'
import PaymentFailurePage from './pages/PaymentPages/PaymentFailurePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = { hasSession: false, validating: true }

		this.validateInitialSessionStatus = this.validateInitialSessionStatus.bind(this)
	}

	/*
	Runs when user initially logs into site (once logged on, each page validates session themselves)
	Checks if there's as userId in the secure session data -- returns true or false.
	Changes the validating flag to false when done.
	Slightly different than the validateSessionStatus methods found on other pages.
	*/
	async validateInitialSessionStatus() {
		const response = await fetch(`./api/isReactAuthLogin`)
		const json = await response.json()
		if (json) {
			this.setState({ hasSession: json.hasSession, validating: false })
		}
	}

	/*
		Executed when user navigates to '/'.
		if session not validated yet, run validateInitialSessionStatus to check for existance of a userId in session.
			If true, '/' redirects to the dashboard.
			If false, '/' rerenders the landing page.
	*/
	RootRouteRedirect({ children, context }) {
		if (context.state.validating) {
			context.validateInitialSessionStatus()
		} else {
			return <Route render={() => (context.state.hasSession ? <Redirect to={{ pathname: '/dashboard' }} /> : children)} />
		}
		return null
	}

	/*
		Executed if user navigates to any route requiring authentication.
		Check for existance of a userId in session.
			If true, user is redirected to desired page.
			If false, user is redirected to landing page.
	*/
	PrivateRoute({ children, context }) {
		console.log('SESSION: ' + context.state.hasSession)
		return <Route render={() => (context.state.hasSession ? children : <Redirect to={{ pathname: '/' }} />)} />
	}

	/*
		Like RootRouteRedirect but sends to PaymentProcessingPage on success and PaymentFailurePage on failure.
		Needed for re-authenticating userId in session upon return from paypal after a payment
	*/
	PaymentRoute({ children, context }) {
		if (context.state.validating) {
			context.validateInitialSessionStatus()
		} else {
			return <Route render={() => (context.state.hasSession ? children : <Redirect to={{ pathname: '/payment-failure' }} />)} />
		}
		return null
	}

	/* 
		Each route below is wrapped in an authenticator route, that first checks if the user has a valid session
		before allowing access to the route.
	*/
	render() {
		return (
			<div>
				<Switch>
					<this.RootRouteRedirect exact path="/" context={this}>
						<Route exact path="/" render={(routeProps) => <LandingPage {...routeProps} />} />
					</this.RootRouteRedirect>

					<this.PrivateRoute exact path="/dashboard" context={this}>
						<Route exact path="/dashboard" render={(routeProps) => <Dashboard {...routeProps} />} />
					</this.PrivateRoute>

					<this.PrivateRoute exact path="/account-settings" context={this}>
						<Route exact path="/account-settings" render={(routeProps) => <AccountSettings {...routeProps} />} />
					</this.PrivateRoute>

					<this.PrivateRoute exact path="/browse-strategies" context={this}>
						<Route exact path="/browse-strategies" render={(routeProps) => <BrowseStrategiesPage {...routeProps} />} />
					</this.PrivateRoute>

					<this.PrivateRoute exact path="/strategy-settings" context={this}>
						<Route exact path="/strategy-settings" render={(routeProps) => <StrategySettingsPage {...routeProps} />} />
					</this.PrivateRoute>

					{/* PAYMENT ROUTES */}

					<Route exact path="/payment-processing" render={(routeProps) => <PaymentProcessingPage {...routeProps} />} />

					<this.PaymentRoute exact path="/payment-success" context={this}>
						<Route exact path="/payment-success" render={(routeProps) => <PaymentSuccessPage {...routeProps} />} />
					</this.PaymentRoute>

					<Route exact path="/payment-failure" render={(routeProps) => <PaymentFailurePage {...routeProps} />} />

					<Route render={(routeProps) => <NotFoundPage {...routeProps} />} />
				</Switch>
			</div>
		)
	}
}

export default App
