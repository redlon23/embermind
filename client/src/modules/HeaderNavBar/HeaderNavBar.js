import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Row, Col, Layout, Button } from 'antd'

const { Header, Content, Sider } = Layout

class HeaderNavBar extends Component {
	constructor(props) {
		super(props)
		console.log('MAH PROPS: ' + JSON.stringify(props))
		this.handleLogout = this.handleLogout.bind(this)
	}

	async handleLogout() {
		await fetch(`./api/logout`)
		window.location.reload()
	}
	render() {
		return (
			<div className="HeaderNavBar">
				<Header style={{ height: '3.5rem' }}>
					<Row gutter={5}>
						<Col xs={0} sm={0} md={4}>
							<Button type="link" onClick={() => this.props.history.push('/browse-strategies')}>
								Browse Strategies
							</Button>
						</Col>
						<Col flex="auto" />
						<Col xs={24} sm={20} md={13} lg={9} xl={7}>
							<Button type="link">Discussion</Button>
							<Button type="link">News</Button>
							<Button type="link" onClick={this.handleLogout}>
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
