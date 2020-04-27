import React, { Component } from 'react'

import HeaderNavBar from '../../modules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../modules/SideNavBar/SideNavBar'

import { Row, Col, Layout, Typography } from 'antd'

const { Content } = Layout
const { Title } = Typography

const contentStyle = { background: '#EBEBEB', border: '2px dashed blue', height: '19.5rem' }
const contentGutter = [ 4, 4 ]
const headerStyle = {
	height: '3rem',
	backgroundColor: '#1A1C25',
	color: '#EBEBEB',
	display: 'flex',
	alignItems: 'center',
	fontSize: '18pt',
	padding: '1rem'
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
										<div className="header-bar" style={headerStyle}>
											Account Settings
										</div>
									</Col>
								</Row>
								<Row gutter={contentGutter}>
									<Col span={12}>
										<div style={{ ...contentStyle }}>Content 1</div>
									</Col>
									<Col span={12}>
										<div style={{ ...contentStyle }}>Content 2</div>
									</Col>
								</Row>
								<Row gutter={contentGutter}>
									<Col span={12}>
										<div style={{ ...contentStyle }}>Content 3</div>
									</Col>
									<Col span={12}>
										<div style={{ ...contentStyle }}>Content 3</div>
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
