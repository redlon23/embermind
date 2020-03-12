import React, { Component } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import './Home.css'

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<h1>Home/Landing Page</h1>
				<nav>
					<NavLink exact to="/dashboard">
						Register
					</NavLink>
					<NavLink exact to="/dashboard">
						Login
					</NavLink>
				</nav>
			</div>
		)
	}
}

export default Home
