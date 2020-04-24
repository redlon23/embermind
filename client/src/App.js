import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Dashboard from './pages/Dashboard/Dashboard'
import AccountSettings from './pages/AccountSettings/AccountSettings'
import SignalProviders from './pages/SignalProviders/SignalProviders'
import SignalSettings from './pages/SignalSettings/SignalSettings'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = { hasSession: false, validating: true }
	}

	/*
	Runs every time a request for a page is made.
	Checks if there's as userId in the secure session data -- returns true or false.
	Changes the validating flag to false when done.
	*/
	async componentWillMount() {
		const response = await fetch(`./api/isReactAuth`)
		const json = await response.json()
		if (json) {
			this.setState({ hasSession: json.hasSession, validating: false })
		}
	}

	/*
		Because React is asynchronous and doesn't wait for componentWillMount to finish before rendering the routes below, this will
		force them to render again with the updated state.  
	*/
	componentDidMount() {
		this.forceUpdate()
	}

	/*
		Executed when user navigates to '/'.
		If componentWillMount is done validating the existance of a userId in session, this checks state for hasSession:
			If true, '/' redirects to the dashboard.
			If false, '/' rerenders the landing page.
	*/
	RootRouteRedirect({ children, context }) {
		if (!context.state.validating) {
			return <Route render={() => (context.state.hasSession ? <Redirect to={{ pathname: '/dashboard' }} /> : children)} />
		} else {
			return null
		}
	}

	/*
		Executed if user navigates to any route requiring authentication.
		If componentWillMount is done validating the existance of a userId in session, it checks state for hasSession:
			If true, user is redirected to desired page.
			If false, user is redirected to landing page.
	*/
	PrivateRoute({ children, context }) {
		if (!context.state.validating) {
			return <Route render={() => (context.state.hasSession ? children : <Redirect to={{ pathname: '/' }} />)} />
		} else {
			return null
		}
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

					<this.PrivateRoute exact path="/signal-providers" context={this}>
						<Route exact path="/signal-providers" render={(routeProps) => <SignalProviders {...routeProps} />} />
					</this.PrivateRoute>

					<this.PrivateRoute exact path="/signal-settings" context={this}>
						<Route exact path="/signal-settings" render={(routeProps) => <SignalSettings {...routeProps} />} />
					</this.PrivateRoute>

					<Route render={(routeProps) => <NotFoundPage {...routeProps} />} />
				</Switch>
			</div>
		)
	}
}

export default App
