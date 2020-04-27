import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './HeaderNavBar.css'

import { Row, Col, Layout, Button } from 'antd'

const { Header } = Layout

class HeaderNavBar extends Component {
	constructor(props) {
		super(props)
		this.handleLogout = this.handleLogout.bind(this)
	}

	async handleLogout() {
		await fetch(`./api/logout`)
		window.location.reload()
	}
	render() {
		return (
			<div className="HeaderNavBar">
				<Header style={{ height: '3.5rem', paddingRight: 0 }}>
					<Row gutter={5}>
						<Col xs={0} sm={0} md={4}>
							<Button className="nav-link" type="link" onClick={() => this.props.history.push('/browse-strategies')}>
								Browse Strategies
							</Button>
						</Col>
						<Col flex="auto" />
						<Col xs={24} sm={20} md={13} lg={9} xl={7}>
							<Button className="nav-link" type="link">
								Discussion
							</Button>
							<Button className="nav-link" type="link">
								News
							</Button>
							<Button className="nav-link" type="link" onClick={this.handleLogout}>
								Logout
							</Button>
						</Col>
					</Row>
				</Header>
			</div>
		)
	}
}

export default withRouter(HeaderNavBar)
