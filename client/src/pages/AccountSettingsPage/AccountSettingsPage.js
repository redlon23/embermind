import React, { Component } from 'react'
import validateSessionStatus from '../../sessionValidator'
import HeaderNavBar from '../../sharedModules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../sharedModules/SideNavBar/SideNavBar'
import PageTitleHeader from '../../sharedModules/PageTitleHeader/PageTitleHeader'
import UserSettingsForm from './modules/UserSettingsForm'
import APISettingsForm from './modules/APISettingsForm'
import SubscriptionDetails from './modules/SubscriptionDetails'
import PurchaseSubscription from './modules/PurchaseSubscription'

import { Row, Col, Layout } from 'antd'

const { Content } = Layout

class AccountSettingsPage extends Component {
	constructor(props) {
		super(props)

		this.state = { subscribed: null, subscriptionType: null, expBillDate: '', isRecurring: null, dataLoaded: false }
	}

	async componentDidMount() {
		await validateSessionStatus()

		const response = await fetch('/api/getSubscriptionInfo')
		const data = await response.json()
		console.log(JSON.stringify(data))
		if (data) {
			this.setState(
				{
					subscribed: data.subscribed,
					subscriptionType: data.subscriptionType,
					expBillDate: data.nextPayment,
					isRecurring: data.isRecurring,
					dataLoaded: true
				},
				() => {
					console.log(this.state)
				}
			)
		}
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
										<PageTitleHeader header="Account Settings" />
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
									<Col span={12}>{this.state.dataLoaded ? <SubscriptionDetails {...this.state} /> : null}</Col>
									<Col span={12}>{this.state.dataLoaded ? <PurchaseSubscription {...this.state} /> : null}</Col>
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
