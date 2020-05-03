import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import HeaderNavBar from '../../sharedModules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../sharedModules/SideNavBar/SideNavBar'
import PageTitleHeader from '../../sharedModules/PageTitleHeader/PageTitleHeader'
import BrowseStrategiesCard from './modules/BrowseStrategiesCard'

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
	constructor(props) {
		super(props)
		this.state = {
			strategies: [
				{ title: 'Epic Trades X', description: 'A good strat!', avgProfitPerTrade: 0.025, subscriberCount: 44, avgRating: 4 },
				{ title: 'Crypto Gnome', description: 'An even better strat!', avgProfitPerTrade: 0.06, subscriberCount: 300, avgRating: 5 },
				{ title: 'Crypto Gnome', description: 'An even better strat!', avgProfitPerTrade: 0.06, subscriberCount: 300, avgRating: 5 }
			]
		}
	}

	async componentDidMount() {
		await validateSessionStatus()
		console.log('Saving users strategies to state!')
	}

	cardRow = (strategy, index) => (
		<Row gutter={[ 28, 16 ]}>
			<Col span={8}>
				<BrowseStrategiesCard {...strategy} />
			</Col>
			{this.state.strategies[index + 1] ? (
				<Col span={8}>
					<BrowseStrategiesCard {...this.state.strategies[index + 1]} />
				</Col>
			) : null}
			{this.state.strategies[index + 2] ? (
				<Col span={8}>
					<BrowseStrategiesCard {...this.state.strategies[index + 2]} />
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
						<Content style={{ padding: '2rem' }}>
							<Row gutter={[ 28, 16 ]}>
								<Col span={24}>
									<PageTitleHeader header="Browse Strategies" />
								</Col>
							</Row>
							<div style={contentStyle}>
								{this.state.strategies.map((strategy, index) => (index % 3 === 0 ? this.cardRow(strategy, index) : null))}
							</div>
						</Content>
					</Layout>
				</Layout>
			</div>
		)
	}
}

export default BrowseStrategiesPage
