import React, { Component } from 'react'
import './Dashboard.css'

import { Button } from 'antd'
import { Row, Col, Layout } from 'antd'

const { Header, Content, Sider } = Layout

const contentStyle = { background: '#EBEBEB', border: '2px dashed blue' }
const contentGutter = [ 28, { xs: 10, sm: 18, md: 26, lg: 34 } ]

class Dashboard extends Component {
	onPanelChange(value, mode) {
		console.log(value.format('YYYY-MM-DD'), mode)
	}

	render() {
		return (
			// <div className="Dashboard">
			// 	<h1>Dashboard</h1>
			// 	<button className="button" onClick={() => this.props.history.push('/')}>
			// 		Logout
			// 	</button>
			// 	<button className="button" onClick={() => this.props.history.push('/account-settings')}>
			// 		Account Settings
			// 	</button>
			// 	<button className="button" onClick={() => this.props.history.push('/signal-providers')}>
			// 		Signal Providers
			// 	</button>
			// 	<button className="button" onClick={() => this.props.history.push('/signal-settings')}>
			// 		Signal Settings
			// 	</button>
			// 	<Button type="primary">Ant Test Button</Button>
			// </div>
			// <div>
			// 	<Row>
			// 		<Col span={24}>
			// 			<div className="logo" style={style2}>
			// 				Header Nav Bar Here
			// 			</div>
			// 		</Col>
			// 	</Row>
			// 	<Row>
			// 		<Row>
			// 			<Col span={3}>
			// 				<div style={contentStyle}>Side Nav Bar Here</div>
			// 			</Col>
			// 		</Row>
			// 		<Col span={3}>
			// 			<div style={contentStyle}>Side Nav Bar Here</div>
			// 		</Col>
			// 		<Col span={6}>
			// 			<div style={style1}>col-6</div>
			// 		</Col>
			// 		<Col span={6}>
			// 			<div style={style1}>col-6</div>
			// 		</Col>
			// 	</Row>
			// </div>
			<div>
				<Layout>
					<Sider style={{ color: 'white' }}>SideNavBar Goes Here</Sider>
					<Layout>
						<Header style={{ height: '3.5rem', color: 'white' }}>HeaderNavBar Goes Here</Header>
						<Content style={{ padding: '2rem 2rem 0rem 2rem' }}>
							<Row gutter={contentGutter}>
								<Col span={24}>
									<div style={{ ...contentStyle, height: '3rem' }}>Content 0</div>
								</Col>
							</Row>
							<Row gutter={contentGutter}>
								<Col span={15}>
									<div style={{ ...contentStyle, height: '22rem' }}>Content 1</div>
								</Col>
								<Col span={9}>
									<div style={{ ...contentStyle, height: '22rem' }}>Content 2</div>
								</Col>
							</Row>
							<Row gutter={contentGutter}>
								<Col span={15}>
									<div style={{ ...contentStyle, height: '15rem' }}>Content 3</div>
								</Col>
								<Col span={9}>
									<div style={{ ...contentStyle, height: '15rem' }}>Content 4</div>
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
