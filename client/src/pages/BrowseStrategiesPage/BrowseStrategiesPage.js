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
				{
					title: 'Epic Trades X',
					description: 'A good strat!',
					avgProfitPerTrade: 0.025,
					subscriberCount: 44,
					ratingCount: 14,
					avgRating: 4,
					imgPath: 'https://cdn.wallpapersafari.com/47/75/i8cgUE.jpg'
				},
				{
					title: 'Shrek Strat',
					description: 'Somebody once told me the world was gonna roll me',
					avgProfitPerTrade: 0.06,
					subscriberCount: 300,
					ratingCount: 124,
					avgRating: 4.5,
					imgPath: 'https://uploads.scratch.mit.edu/users/avatars/34083956.png'
				},
				{
					title: 'Crypto Bob',
					description: 'Obviously the best strat!',
					avgProfitPerTrade: 0.1,
					subscriberCount: 2500,
					ratingCount: 1101,
					avgRating: 5,
					imgPath: 'https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199879943/Ramen-Panda_800x800_SEPS-500x500.jpg'
				}
			]
		}
	}

	async componentDidMount() {
		await validateSessionStatus()
		console.log('Saving users strategies to state!')
	}

	cardRow = (strategy, index) => (
		<Row gutter={[ 28, 16 ]}>
			<Col span={12}>
				<BrowseStrategiesCard {...strategy} />
			</Col>
			{this.state.strategies[index + 1] ? (
				<Col span={12}>
					<BrowseStrategiesCard {...this.state.strategies[index + 1]} />
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
