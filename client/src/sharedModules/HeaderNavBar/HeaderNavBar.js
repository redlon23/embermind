import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './HeaderNavBar.scss'

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
			<Header className="HeaderNavBar" style={{ height: '3.2rem', paddingRight: 0 }}>
				<Row gutter={5}>
					<Col xs={0} sm={0} md={4}>
						<Button className="navLink" type="link" onClick={() => this.props.history.push('/browse-strategies')}>
							Browse Strategies
						</Button>
					</Col>
					<Col flex="auto" />
					<Col xs={24} sm={20} md={13} lg={9} xl={7}>
						<Button className="navLink" type="link">
							Discussion
						</Button>
						<Button className="navLink" type="link">
							News
						</Button>
						<Button className="navLink" type="link" onClick={this.handleLogout}>
							Logout
						</Button>
					</Col>
				</Row>
			</Header>
		)
	}
}

export default withRouter(HeaderNavBar)
