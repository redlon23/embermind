import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import HeaderNavBar from '../../sharedModules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../sharedModules/SideNavBar/SideNavBar'

import { Row, Col, Layout } from 'antd'

const { Content } = Layout

const contentStyle = { background: '#EBEBEB', border: '2px dashed blue' }
const contentGutter = [ 28, { xs: 10, sm: 18, md: 26, lg: 34 } ]

class StrategySettingsPage extends Component {
	async componentDidMount() {
		await validateSessionStatus()
	}

	render() {
		return (
			<div className="StrategySettingsPage">
				<Layout>
					<SideNavBar />
					<Layout>
						<HeaderNavBar />
						<Content style={{ padding: '2rem 2rem 0rem 2rem' }}>
							<h1>Strategy Settings</h1>
						</Content>
					</Layout>
				</Layout>
			</div>
		)
	}
}

export default StrategySettingsPage
