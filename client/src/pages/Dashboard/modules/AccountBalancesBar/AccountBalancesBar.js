import React, { Component } from 'react'
import { Descriptions, Statistic } from 'antd'

import classes from './AccountBalancesBar.module.css'
import './AccountBalancesBar.css'


class AccountBalancesBar extends Component{
    state = {
        unrealizedPLValue: 0,
        totalUSDTValue: 0,
        totalCADValue: 0,
    }

    dynamicValueColourRG(value){
        if(value > 0){
            return { color: '#00ff00' }
        } else {
            return { color: '#ff0000' }
        }
    }

    async componentDidMount(){
        const response = await fetch('/api/getUnrealizedPnL')
        const data = await response.json()
        const response2 = await fetch('/api/getWalletBalance')
        const data2 = await response2.json()
        this.setState({ unrealizedPLValue: data.unrealizedPnL, totalUSDTValue: data2.balance })
        }

    render(){
            return (
                <div className={classes.AccountBalancesBar}>
                        <Descriptions> 
                            <Descriptions.Item label='Unrealized P&L'>
                                <Statistic
                                value = { this.state.unrealizedPLValue }
                                precision = { 4 }
                                valueStyle = { this.dynamicValueColourRG(this.state.unrealizedPLValue)}
                                suffix =''
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label='Total in USDT'>
                                <Statistic
                                value = { this.state.totalUSDTValue }
                                precision = { 5 }
                                valueStyle = {{ color: '#ffff00' }}/>
                                </Descriptions.Item>
                            <Descriptions.Item label='Total in CAD'>
                                <Statistic
                                value = { this.state.totalCAD }
                                precision = { 2 }
                                valueStyle = {{ color: '#00ff00' }}/>
                                </Descriptions.Item>
                        </Descriptions>
                </div>
            )
    }
}

export default AccountBalancesBar

