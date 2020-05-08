import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import HeaderNavBar from '../../sharedModules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../sharedModules/SideNavBar/SideNavBar'
import PageTitleHeader from '../../sharedModules/PageTitleHeader/PageTitleHeader'
import StrategySettingsForm from './modules/StrategySettingsForm'

import { Row, Col, Layout, Tabs, message } from 'antd'

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
			equippedStrategySettings: [],
			renderDataLoaded: false
		}
	}

	async componentDidMount() {
		await validateSessionStatus()

		const response = await fetch('/api/getAllEquippedStrategySettings')
		const data = await response.json()
		if (response.status === 200) {
			this.setState({ equippedStrategySettings: data.equippedStrategySettings, renderDataLoaded: true })
		} else {
			message.error(data.message)
		}
	}

	strategyTabPane = (strategyName) => (
		<TabPane tab={strategyName} key={strategyName}>
			<div style={paneStyle}>
				{`${strategyName} Settings`}
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
									{this.state.renderDataLoaded ? (
										<Tabs className="ant-tabs-top-bar ant-tabs-card-bar" type="card" animated={false}>
											{this.state.equippedStrategySettings.map((strategy) => this.strategyTabPane(strategy.strategyName))}
										</Tabs>
									) : null}
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
