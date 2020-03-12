import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import AccountSettings from './pages/AccountSettings/AccountSettings'
import Charts from './pages/Charts/Charts'
import SignalProviders from './pages/SignalProviders/SignalProviders'
import SignalSettings from './pages/SignalSettings/SignalSettings'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" render={(routeProps) => <Home {...routeProps} />} />
					<Route exact path="/dashboard" render={(routeProps) => <Dashboard {...routeProps} />} />
					<Route
						exact
						path="/account-settings"
						render={(routeProps) => <AccountSettings {...routeProps} />}
					/>
					<Route exact path="/charts" render={(routeProps) => <Charts {...routeProps} />} />
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
