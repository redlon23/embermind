import React, { Component } from 'react'
import { Descriptions, Statistic } from 'antd'

import classes from './AccountBalancesBar.module.css'
import './AccountBalancesBar.css'

class AccountBalancesBar extends Component {
	state = {
		unrealizedPLValue: 0,
		totalUSDTValue: 0,
		totalCADValue: 0
	}

	dynamicValueColourRG(value) {
		if (value > 0) {
			return { color: '#00ff00' }
		} else {
			return { color: '#ff0000' }
		}
	}

	async componentDidMount() {
		const response = await fetch('/api/getUnrealizedPnL')
		const data = await response.json()
		const response2 = await fetch('/api/getWalletBalance')
		const data2 = await response2.json()
		this.setState({ unrealizedPLValue: data.unrealizedPnL, totalUSDTValue: data2.balance, totalCADValue: data2.balance * 1.41 })
	}

	render() {
		return (
			<div className={classes.AccountBalancesBar}>
				<div className="AccountBalancesBar">
					<Descriptions>
						<Descriptions.Item label="Unrealized P&L">
							<Statistic
								value={this.state.unrealizedPLValue}
								precision={4}
								valueStyle={this.dynamicValueColourRG(this.state.unrealizedPLValue)}
								suffix="USDT"
							/>
						</Descriptions.Item>
						<Descriptions.Item className="descItem" label="Total in USDT">
							<Statistic value={this.state.totalUSDTValue} precision={2} valueStyle={{ color: '#00ff00' }} />
						</Descriptions.Item>
						<Descriptions.Item className="descItem" label="Total in CAD">
							<Statistic value={this.state.totalCADValue} precision={2} valueStyle={{ color: '#00ff00' }} />
						</Descriptions.Item>
					</Descriptions>
				</div>
			</div>
		)
	}
}

export default AccountBalancesBar
