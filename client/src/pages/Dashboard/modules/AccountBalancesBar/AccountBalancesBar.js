import React, { Component } from 'react'
import { Descriptions, Statistic } from 'antd'

import classes from './AccountBalancesBar.module.css'
import './AccountBalancesBar.css'

import validateSessionStatus from '../../../../sessionValidator'

class AccountBalancesBar extends Component{
    state = {
        unrealizedPLValue: 0,
        totalBTCValue: 0,
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
        await validateSessionStatus()
    }
    render(){
        return (
            <div className={classes.AccountBalancesBar}>
                    <Descriptions> 
                        <Descriptions.Item label='Unrealized P&L'>
                            <Statistic
                            value={ this.unrealizedPLValue }
                            precision={ 0 }
                            valueStyle={ this.dynamicValueColourRG(this.unrealizedPLValue) }
                            suffix='%'
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label='Total in BTC'>
                            <Statistic
                            value={this.totalBTC}
                            precision={5}
                            valueStyle={{ color: '#ffff00' }}/>
                            </Descriptions.Item>
                        <Descriptions.Item label='Total in CAD'>
                            <Statistic
                            value={this.totalCAD}
                            precision={2}
                            valueStyle={{ color: '#00ff00' }}/>
                            </Descriptions.Item>
                    </Descriptions>
            </div>
        )
    }
}

export default AccountBalancesBar

