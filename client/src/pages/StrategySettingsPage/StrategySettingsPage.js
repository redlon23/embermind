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
	constructor(props) {
		super(props)
		this.state = {
			strategies: [ 'EpicTradesX Settings', 'Gnome Strat Settings', 'Crypo Bob Settings' ]
		}
	}

	async componentDidMount() {
		await validateSessionStatus()
	}

	strategyTabPane = (strategyName) => (
		<TabPane tab={strategyName} key={strategyName}>
			<div style={paneStyle}>
				{strategyName}
				<StrategySettingsForm strategyName={strategyName} />
			</div>
		</TabPane>
	)

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
									<Tabs className="ant-tabs-top-bar ant-tabs-card-bar" type="card" animated={false}>
										{this.state.strategies.map((strategyName) => this.strategyTabPane(strategyName))}
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
