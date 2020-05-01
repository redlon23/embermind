import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import HeaderNavBar from '../../sharedModules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../sharedModules/SideNavBar/SideNavBar'
import PageTitleHeader from '../../sharedModules/PageTitleHeader/PageTitleHeader'
import StrategySettingsForm from './modules/StrategySettingsForm'

import { Row, Col, Layout, Tabs } from 'antd'

const { Content } = Layout
const { TabPane } = Tabs

const paneStyle = {
	background: '#1A1C25',
	minHeight: '33rem',
	maxHeight: '33rem',
	fontSize: '16pt',
	padding: '1rem',
	color: '#EBEBEB'
}

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
							<Row gutter={[ 28, { xs: 8, sm: 16, md: 24, lg: 32 } ]} style={{ marginBottom: 0 }}>
								<Col span={24}>
									<PageTitleHeader header="Strategy Settings" />
								</Col>
							</Row>
							<Row style={{ height: '10rem' }}>
								<Col span={24}>
									<Tabs className="ant-tabs-top-bar ant-tabs-card-bar" type="card" defaultActiveKey="1" animated={false}>
										<TabPane tab="Global" key="Global">
											<div style={paneStyle}>
												Global Strategy Settings
												<StrategySettingsForm strategyName={'global'} />
											</div>
										</TabPane>
										<TabPane tab="Gnome Strat" key="Gnome Strat">
											<div style={paneStyle}>Gnome Strat Settings</div>
										</TabPane>
										<TabPane tab="Crypto Bob" key="Crypto Bob">
											<div style={paneStyle}>Crypo Bob Settings</div>
										</TabPane>
									</Tabs>
								</Col>
							</Row>
						</Content>
					</Layout>
				</Layout>
			</div>
		)
	}
}

export default StrategySettingsPage
