import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Dashboard from './pages/Dashboard/Dashboard'
import AccountSettings from './pages/AccountSettingsPage/AccountSettingsPage'
import BrowseStrategiesPage from './pages/BrowseStrategiesPage/BrowseStrategiesPage'
import StrategySettingsPage from './pages/StrategySettingsPage/StrategySettingsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = { hasSession: false, validating: true }

		this.validateSessionStatus = this.validateSessionStatus.bind(this)
	}

	/*
	Runs every time a request for a page is made.
	Checks if there's as userId in the secure session data -- returns true or false.
	Changes the validating flag to false when done.
	*/

	async validateSessionStatus() {
		console.log('3: ' + this.state.hasSession)
		const response = await fetch(`./api/isReactAuthLogin`)
		const json = await response.json()
		if (json) {
			this.setState({ hasSession: json.hasSession, validating: false })
		}
	}

	/*
		Executed when user navigates to '/'.
		If componentWillMount is done validating the existance of a userId in session, this checks state for hasSession:
			If true, '/' redirects to the dashboard.
			If false, '/' rerenders the landing page.
	*/
	RootRouteRedirect({ children, context }) {
		console.log('1: ' + context.state.hasSession)
		if (context.state.validating) {
			context.validateSessionStatus()
			console.log('4: ' + context.state.hasSession)
		} else {
			return <Route render={() => (context.state.hasSession ? <Redirect to={{ pathname: '/dashboard' }} /> : children)} />
		}
		return null
	}

	/*
		Executed if user navigates to any route requiring authentication.
		If componentWillMount is done validating the existance of a userId in session, it checks state for hasSession:
			If true, user is redirected to desired page.
			If false, user is redirected to landing page.
	*/
	PrivateRoute({ children, context }) {
		console.log('2: ' + context.state.hasSession)
		if (context.state.validating) {
			context.validateSessionStatus()
		} else {
			return <Route render={() => (context.state.hasSession ? children : <Redirect to={{ pathname: '/' }} />)} />
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

					<Route render={(routeProps) => <NotFoundPage {...routeProps} />} />
				</Switch>
			</div>
		)
	}
}

export default App
