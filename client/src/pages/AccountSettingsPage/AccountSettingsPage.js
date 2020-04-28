import React, { Component } from 'react'
import HeaderNavBar from '../../modules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../modules/SideNavBar/SideNavBar'
import UserSettingsForm from '../../modules/UserSettingsForm/UserSettingsForm'
import APISettingsForm from '../../modules/APISettingsForm/APISettingsForm'
import SubscriptionDetails from '../../modules/SubscriptionDetails/SubscriptionDetails'

import { Row, Col, Layout } from 'antd'

const { Content } = Layout

const headerStyle = {
	height: '3rem',
	backgroundColor: '#1A1C25',
	color: '#EBEBEB',
	display: 'flex',
	alignItems: 'center',
	fontSize: '16pt',
	padding: '1rem'
}

const contentStyle = {
	background: '#1A1C25',
	height: '19.5rem',
	fontSize: '16pt',
	padding: '1rem',
	color: '#EBEBEB'
}

class AccountSettingsPage extends Component {
	render() {
		return (
			<div className="AccountSettingsPage">
				<div>
					<Layout>
						<SideNavBar />
						<Layout>
							<HeaderNavBar />
							<Content style={{ padding: '2rem 2rem 0rem 2rem' }}>
								<Row gutter={[ 28, { xs: 10, sm: 18, md: 26, lg: 34 } ]}>
									<Col span={24}>
										<div style={headerStyle}>Account Settings</div>
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
