import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import HeaderNavBar from '../../sharedModules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../sharedModules/SideNavBar/SideNavBar'
import PageTitleHeader from '../../sharedModules/PageTitleHeader/PageTitleHeader'

import { Row, Col, Layout } from 'antd'

const { Content } = Layout

const contentStyle = {
	background: '#1A1C25',
	minHeight: '34.5rem',
	fontSize: '16pt',
	padding: '1rem',
	color: '#EBEBEB'
}

class BrowseStrategiesPage extends Component {
	async componentDidMount() {
		await validateSessionStatus()
	}

	render() {
		return (
			<div>
				<Layout>
					<SideNavBar />
					<Layout>
						<HeaderNavBar />
						<Content style={{ padding: '2rem 2rem 0rem 2rem' }}>
							<Row gutter={[ 28, { xs: 8, sm: 16, md: 24, lg: 32 } ]}>
								<Col span={24}>
									<PageTitleHeader header="Browse Strategies Page" />
								</Col>
							</Row>
							<Row>
								<Col span={24}>
									<div style={contentStyle}>Stuff</div>
								</Col>
							</Row>
						</Content>
					</Layout>
				</Layout>
			</div>
		)
	}
}

export default BrowseStrategiesPage
