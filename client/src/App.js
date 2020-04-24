import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Dashboard from './pages/Dashboard/Dashboard'
import AccountSettings from './pages/AccountSettings/AccountSettings'
import SignalProviders from './pages/SignalProviders/SignalProviders'
import SignalSettings from './pages/SignalSettings/SignalSettings'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

// const checkAuth = async (routeProps) => {
// 	const response = await fetch('./api/isAuth')
// 	const data = await response.json()

// 	if (data.status === 200) {
// 		console.log('Authenticated')
// 		return false
// 	} else {
// 		console.log('Not Authenticated')
// 		return undefined
// 	}
// }

// const handleRouteDashboard = (routeProps) => {
// 	checkAuth(routeProps) ? <Dashboard {...routeProps} /> : null
// }

class App extends Component {
	constructor() {
		super()
		this.state = { userId: '', validating: true }
		console.log('state: ' + JSON.stringify(this.state))
	}

	async componentWillMount() {
		const response = await fetch(`./api/isAuth`)
		const json = await response.json()
		console.log(json)
		this.setState({ userId: json.userId, validating: false })
		console.log('This was called!:' + JSON.stringify(json))
	}

	componentDidMount() {
		this.forceUpdate()
	}

	checkAuth = () => {
		console.log('COOL' + JSON.stringify(this.state))
		return this.state.userId
	}

	RootRouteRedirect({ children, context }) {
		if (!context.state.validating) {
			return (
				<Route render={() => (context.checkAuth() ? <Redirect to={{ pathname: '/dashboard' }} /> : children)} />
			)
		} else {
			return null
		}
	}

	PrivateRoute({ children, context }) {
		if (!context.state.validating) {
			return <Route render={() => (context.checkAuth() ? children : <Redirect to={{ pathname: '/' }} />)} />
		} else {
			return null
		}
	}

	render() {
		return (
			<div>
				<Switch>
					<this.RootRouteRedirect exact path="/" context={this}>
						<LandingPage />
					</this.RootRouteRedirect>
					<this.PrivateRoute exact path="/dashboard" context={this}>
						<Dashboard />
					</this.PrivateRoute>
					/>
					<Route
						exact
						path="/account-settings"
						render={(routeProps) => <AccountSettings {...routeProps} />}
					/>
					<Route
						exact
						path="/signal-providers"
						render={(routeProps) => <SignalProviders {...routeProps} />}
					/>
					<Route exact path="/signal-settings" render={(routeProps) => <SignalSettings {...routeProps} />} />
					<Route render={(routeProps) => <NotFoundPage {...routeProps} />} />
				</Switch>
			</div>
		)
	}
}

export default App
