import React, { Component } from 'react'
import HeaderNavBar from '../../modules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../modules/SideNavBar/SideNavBar'

import { Row, Col, Layout } from 'antd'

const { Content } = Layout

const contentStyle = { background: '#EBEBEB', border: '2px dashed blue' }
const contentGutter = [ 28, { xs: 10, sm: 18, md: 26, lg: 34 } ]

class BrowseStrategiesPage extends Component {
	render() {
		return (
			<div>
				<Layout>
					<SideNavBar />
					<Layout>
						<HeaderNavBar />
						<Content style={{ padding: '2rem 2rem 0rem 2rem' }}>
							<h1>Browse Strategies Page</h1>
						</Content>
					</Layout>
				</Layout>
			</div>
		)
	}
}

export default BrowseStrategiesPage
