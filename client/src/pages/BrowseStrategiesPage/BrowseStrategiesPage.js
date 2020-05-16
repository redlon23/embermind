import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import HeaderNavBar from '../../sharedModules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../sharedModules/SideNavBar/SideNavBar'
import PageTitleHeader from '../../sharedModules/PageTitleHeader/PageTitleHeader'
import StrategyCard from './modules/StrategyCard'
import './BrowseStrategiesPage.scss'

import { Row, Col, Layout } from 'antd'

const { Content } = Layout

class BrowseStrategiesPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			strategies: []
		}
	}

	async componentDidMount() {
		await validateSessionStatus()

		const response = await fetch('/api/getAllStrategiesInfo')
		if (response.status === 200) {
			const data = await response.json()
			this.setState({ strategies: data })
		}
	}

	cardRow = (strategy, index) => (
		<Row gutter={[ 28, 16 ]} key={index}>
			<Col span={12}>
				<StrategyCard {...strategy} />
			</Col>
			{this.state.strategies[index + 1] ? (
				<Col span={12}>
					<StrategyCard {...this.state.strategies[index + 1]} />
				</Col>
			) : null}
		</Row>
	)

	render() {
		return (
			<div>
				<Layout>
					<SideNavBar />
					<Layout>
						<HeaderNavBar />
						<Content className="contentSection">
							<Row gutter={[ 28, 16 ]}>
								<Col span={24}>
									<PageTitleHeader header="Browse Strategies" />
								</Col>
							</Row>

							<div className="cardContainer">
								{this.state.strategies.map((strategy, index) => (index % 2 === 0 ? this.cardRow(strategy, index) : null))}
							</div>
						</Content>
					</Layout>
				</Layout>
			</div>
		)
	}
}

export default BrowseStrategiesPage
