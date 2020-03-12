import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'

class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" render={() => <Home />} />
					<Route exact path="/dashboard" render={() => <Dashboard />} />
				</Switch>
			</div>
		)
	}
}

export default App
