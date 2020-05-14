import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './SideNavBar.css'

import { Layout, Menu, Avatar, Badge, Button, Switch, message } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const { Sider } = Layout

class SideNavBar extends Component {
	constructor(props) {
		super(props)
		this.state = { tradingEnabled: cookies.get('tradingEnabled') }
	}

	// async componentDidMount() {
	// 	let tradingEnabled = false
	// 	if (this.session.tradingEnabled) {
	// 		tradingEnabled = this.session.tradinEnabled
	// 	} else {
	// 		tradingEnabled = await fetch('/isTradingEnabled')
	// 	}
	// 	this.setState({ tradingEnabled, renderDataLoaded: true })
	// }

	toggleTrading = async () => {
		const response = await fetch('/api/toggleTrading')
		const data = await response.json()
		if (response.status === 200) {
			this.setState({ tradingEnabled: !this.state.tradingEnabled })
			message.success(data.message)
		} else {
			message.error(data.message)
		}
	}

	render() {
		return (
			<div className="SideNavBar">
				<Sider style={{ minHeight: '100vh' }}>
					<div className="logo-container">
						<img
							className="logo"
							src={`${process.env.PUBLIC_URL}logo-text.png`}
							alt="EmberMind"
							onClick={() => this.props.history.push('/dashboard')}
						/>
					</div>
					<div className="user-container">
						<Button type="link" className="user-name" onClick={() => this.props.history.push('/account-settings')}>
							{cookies.get('name')}
						</Button>
						<Badge count={1}>
							<Avatar
								className="notification-icon"
								size="default"
								style={{ backgroundColor: '#001529' }}
								icon={<BellOutlined style={{ fontSize: '16pt', color: '#DBDBDB' }} />}
							/>
						</Badge>
					</div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={[ this.props.location.pathname ]}>
						<Menu.Divider />
						<Menu.Item key="/dashboard" onClick={() => this.props.history.push('/dashboard')}>
							<span className="nav-text">Dashboard</span>
						</Menu.Item>
						<Menu.Item key="/trade-records" disabled={true}>
							<span className="nav-text">Trade Records</span>
						</Menu.Item>
						<Menu.Item key="/equipped-strategies" disabled={true}>
							<span className="nav-text">Equipped Strategies</span>
						</Menu.Item>
						<Menu.Divider />
						<Menu.Item key="/account-settings" onClick={() => this.props.history.push('/account-settings')}>
							<span className="nav-text">Account Settings</span>
						</Menu.Item>
						<Menu.Item key="/strategy-settings" onClick={() => this.props.history.push('/strategy-settings')}>
							<span className="nav-text">Strategy Settings</span>
						</Menu.Item>
					</Menu>
					<Menu theme="dark" selectable={false}>
						<Menu.Item onClick={this.toggleTrading}>
							<Switch defaultChecked={this.state.tradingEnabled} onChange={this.toggleTrading} />
							<span className="nav-text" style={{ paddingLeft: '0.6rem' }}>
								Enable / Disable
							</span>
						</Menu.Item>
					</Menu>
				</Sider>
			</div>
		)
	}
}

export default withRouter(SideNavBar)
