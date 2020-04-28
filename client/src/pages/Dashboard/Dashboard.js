import React, { Component } from 'react'
import HeaderNavBar from '../../modules/HeaderNavBar/HeaderNavBar'
import SideNavBar from '../../modules/SideNavBar/SideNavBar'
import '../../sharedStyles.css'

import { Row, Col, Layout } from 'antd'

const { Content } = Layout

const contentStyle = { background: '#EBEBEB', border: '2px dashed blue' }
const contentGutter = [ 28, { xs: 8, sm: 16, md: 24, lg: 32 } ]

class Dashboard extends Component {
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
						<Content style={{ padding: '2rem 2rem 0rem 2rem' }}>
							<Row gutter={contentGutter}>
								<Col span={24}>
									<div style={{ ...contentStyle, height: '2.6rem' }}>Content 0</div>
								</Col>
							</Row>
							<Row gutter={contentGutter}>
								<Col span={15}>
									<div style={{ ...contentStyle, height: '20rem' }}>Content 1</div>
								</Col>
								<Col span={9}>
									<div style={{ ...contentStyle, height: '20rem' }}>Content 2</div>
								</Col>
							</Row>
							<Row gutter={contentGutter}>
								<Col span={15}>
									<div style={{ ...contentStyle, height: '13rem' }}>Content 3</div>
								</Col>
								<Col span={9}>
									<div style={{ ...contentStyle, height: '13rem' }}>Content 4</div>
								</Col>
							</Row>
						</Content>
					</Layout>
				</Layout>
			</div>
		)
	}
}

export default Dashboard
