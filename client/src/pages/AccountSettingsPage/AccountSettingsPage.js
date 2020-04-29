import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import HeaderNavBar from '../../sharedModules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../sharedModules/SideNavBar/SideNavBar'
import PageTitleHeader from '../../sharedModules/PageTitleHeader/PageTitleHeader'
import UserSettingsForm from './modules/UserSettingsForm'
import APISettingsForm from './modules/APISettingsForm'
import SubscriptionDetails from './modules/SubscriptionDetails'

import { Row, Col, Layout } from 'antd'

const { Content } = Layout

const contentStyle = {
	background: '#1A1C25',
	height: '17.5rem',
	fontSize: '16.5pt',
	padding: '1rem',
	color: '#EBEBEB'
}

class AccountSettingsPage extends Component {
	async componentDidMount() {
		await validateSessionStatus()
	}

	render() {
		return (
			<div className="AccountSettingsPage">
				<div>
					<Layout>
						<SideNavBar />
						<Layout>
							<HeaderNavBar />
							<Content style={{ padding: '2rem 2rem 0rem 2rem' }}>
								<Row gutter={[ 28, { xs: 8, sm: 16, md: 24, lg: 32 } ]}>
									<Col span={24}>
										<PageTitleHeader />
									</Col>
								</Row>
								<Row gutter={[ 4, 4 ]}>
									<Col span={12}>
										<UserSettingsForm />
									</Col>
									<Col span={12}>
										<APISettingsForm />
									</Col>
								</Row>
								<Row gutter={[ 0, 0 ]}>
									<Col span={12}>
										<SubscriptionDetails />
									</Col>
									<Col span={12}>
										<div style={{ ...contentStyle }} />
									</Col>
								</Row>
							</Content>
						</Layout>
					</Layout>
				</div>
			</div>
		)
	}
}

export default AccountSettingsPage
