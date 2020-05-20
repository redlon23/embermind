import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import HeaderNavBar from '../../sharedModules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../sharedModules/SideNavBar/SideNavBar'

import { Row, Col, Layout } from 'antd'

import './Dashboard.css'
//Dashboard Content Components
import AccountBalancesBar from './modules/AccountBalancesBar/AccountBalancesBar'
import OpenPositionsTable from './modules/OpenPositionsTable/OpenPositionsTable'
import CoinDistributionChart from './modules/CoinDistributionChart/CoinDistributionChart'
import ProfitLossChart from './modules/ProfitLossChart/ProfitLossChart'
const { Content } = Layout

const contentStyle = { background: '#13161d' }
const contentGutter = [ 28, { xs: 8, sm: 16, md: 24, lg: 32 } ]

class Dashboard extends Component {
	async componentDidMount() {
		await validateSessionStatus()
	}

	onPanelChange(value, mode) {
		console.log(value.format('YYYY-MM-DD'), mode)
	}

	render() {
		return (
			<div>
				<Layout>
					<SideNavBar />
					<Layout>
						<HeaderNavBar />
						<Content theme="dark" style={{ padding: '1rem 1rem 0rem 1rem', backgroundColor: '#181a22' }}>
							<Row gutter={contentGutter}>
								<Col span={24}>
									<div style={{ ...contentStyle, height: '2rem' }}>
										<AccountBalancesBar />
									</div>
								</Col>
							</Row>
							<Row gutter={contentGutter}>
								<Col span={15}>
									<div style={{ ...contentStyle, height: '30rem' }}>
										<ProfitLossChart />
									</div>
								</Col>
								<Col span={9}>
									<div style={{ ...contentStyle, height: '30rem' }}>
										<OpenPositionsTable />
									</div>
								</Col>
							</Row>
							{/* <Row gutter={contentGutter}>
								<Col span={24}>
									<div style={{ ...contentStyle, height: '13rem' }}>
										
									</div>
								</Col>
							</Row> */}
						</Content>
					</Layout>
				</Layout>
			</div>
		)
	}
}

export default Dashboard
