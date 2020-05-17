import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import HeaderNavBar from '../../sharedModules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../sharedModules/SideNavBar/SideNavBar'
import PageTitleHeader from '../../sharedModules/PageTitleHeader/PageTitleHeader'
import StrategySettingsForm from './modules/StrategySettingsForm'
import './StrategySettingsPage.scss'

import { Row, Col, Layout, Tabs, Tooltip, message } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

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

	strategyTabPane = (strategy) => (
		<TabPane tab={strategy.strategyName} key={strategy.strategyName}>
			<div style={paneStyle}>
				<div className="iconContainer">
					{`${strategy.strategyName} Settings`}
					<Tooltip placement="top" title="Hover over setting names for a description of each">
						<QuestionCircleOutlined style={{ marginRight: '0.6rem', marginTop: '0.4rem' }} />
					</Tooltip>
				</div>
				<StrategySettingsForm strategySettings={strategy} />
			</div>
		</TabPane>
	)

	render() {
		return (
			<Layout className="StrategySettingsPage">
				<SideNavBar />
				<Layout>
					<HeaderNavBar />
					<Content className="contentSection">
						<Row gutter={[ 28, 16 ]}>
							<Col span={24}>
								<PageTitleHeader header="Strategy Settings" />
							</Col>
						</Row>
						<Row>
							<Col className="tabSection" span={24}>
								{this.state.renderDataLoaded ? (
									<Tabs className="ant-tabs-top-bar ant-tabs-card-bar" type="card" animated={false}>
										{this.state.equippedStrategySettings.map((strategy) => this.strategyTabPane(strategy))}
									</Tabs>
								) : null}
							</Col>
						</Row>
					</Content>
				</Layout>
			</Layout>
		)
	}
}

export default StrategySettingsPage
