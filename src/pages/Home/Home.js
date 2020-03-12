import React, { Component } from 'react'
// import { Button } from 'carbon-components-react'
import './Home.css'

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<h1>Home/Landing Page</h1>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Register
				</button>
				<button className="button" onClick={() => this.props.history.push('/dashboard')}>
					Login
				</button>
				{/* <Button onClick={() => this.props.history.push('/dashboard')}>Carbon Test Button</Button> */}
			</div>
		)
	}
}

export default Home
