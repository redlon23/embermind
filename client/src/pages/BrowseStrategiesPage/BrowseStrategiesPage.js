import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import HeaderNavBar from '../../sharedModules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../sharedModules/SideNavBar/SideNavBar'
import PageTitleHeader from '../../sharedModules/PageTitleHeader/PageTitleHeader'
import StrategyCard from './modules/StrategyCard'

import { Row, Col, Layout } from 'antd'

const { Content } = Layout

const contentStyle = {
	background: '#1A1C25',
	minHeight: '36rem',
	fontSize: '16pt',
	padding: '1rem',
	color: '#EBEBEB'
}

class BrowseStrategiesPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			strategies: []
		}
	}

	async componentDidMount() {
		try {
			await validateSessionStatus()

			const response = await fetch('/api/getAllStrategiesInfo')
			const data = await response.json()
			console.log('DATA 1: ' + JSON.stringify(data))
			this.setState({ strategies: data })
			console.log('DATA 2: ' + JSON.stringify(this.state))
		} catch (err) {
			console.error(err)
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
