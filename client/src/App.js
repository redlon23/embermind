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
		console.log('state: ' + JSON.stringify(this.state))
		console.log('PROPS: ' + JSON.stringify(this.props))
	}

	async componentWillMount() {
		const response = await fetch(`./api/isReactAuth`)
		const json = await response.json()
		console.log('JSON: ' + JSON.stringify(json))
		if (json) {
			this.setState({ hasSession: json.hasSession, validating: false })
			console.log('COOL2' + JSON.stringify(this.state))
		}
	}

	componentDidMount() {
		this.forceUpdate()
	}

	RootRouteRedirect({ children, context }) {
		if (!context.state.validating) {
			return <Route render={() => (context.state.hasSession ? <Redirect to={{ pathname: '/dashboard' }} /> : children)} />
		} else {
			return null
		}
	}

	PrivateRoute({ children, context }) {
		if (!context.state.validating) {
			return <Route render={() => (context.state.hasSession ? children : <Redirect to={{ pathname: '/' }} />)} />
		} else {
			return null
		}
	}

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
