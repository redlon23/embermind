import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './SideNavBar.css'

import { Layout, Menu, Avatar, Badge, Button, Typography } from 'antd'
import { BellOutlined } from '@ant-design/icons'

const { Sider } = Layout

class SideNavBar extends Component {
	render() {
		return (
			<div className="SideNavBar">
				<Sider style={{ backgroundColor: '#001529', height: '100vh' }}>
					<div className="logo-container">
						<img className="logo" src={process.env.PUBLIC_URL + 'logo-text.png'} onClick={() => this.props.history.push('/dashboard')} />
					</div>
					<div className="user-container">
						<Button type="link" className="user-name" onClick={() => this.props.history.push('/account-settings')}>
							Bob Bobasson
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
					<Menu theme="dark" mode="inline" defaultSelectedKeys={[ '1' ]}>
						<Menu.Divider />
						<Menu.Item key="1" onClick={() => this.props.history.push('/dashboard')}>
							<span className="nav-text">Dashboard</span>
						</Menu.Item>
						<Menu.Item key="2">
							<span className="nav-text">Trade Records</span>
						</Menu.Item>
						<Menu.Item key="3">
							<span className="nav-text">Equipped Strategies</span>
						</Menu.Item>
						<Menu.Divider />
						<Menu.Item key="4" onClick={() => this.props.history.push('/account-settings')}>
							<span className="nav-text">Account Settings</span>
						</Menu.Item>
						<Menu.Item key="5" onClick={() => this.props.history.push('/strategy-settings')}>
							<span className="nav-text">Strategy Settings</span>
						</Menu.Item>
						<Menu.Item key="6">
							<span className="nav-text">Active / Inactive</span>
						</Menu.Item>
					</Menu>
				</Sider>
			</div>
		)
	}
}

export default withRouter(SideNavBar)
