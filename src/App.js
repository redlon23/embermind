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
					<Route exact path="/" render={() => <Home />} />
					<Route exact path="/dashboard" render={() => <Dashboard />} />
					<Route exact path="/account-settings" render={() => <AccountSettings />} />
					<Route exact path="/charts" render={() => <Charts />} />
					<Route exact path="/signal-providers" render={() => <SignalProviders />} />
					<Route exact path="/signal-settings" render={() => <SignalSettings />} />
					<Route render={() => <NotFoundPage />} />
				</Switch>
			</div>
		)
	}
}

export default App
