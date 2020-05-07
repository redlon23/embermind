import React, { Component } from 'react'
import { Descriptions, Statistic } from 'antd'

import classes from './AccountBalancesBar.module.css'
import './AccountBalancesBar.css'

class AccountBalancesBar extends Component{
    render(){
        return (
            <div className={classes.AccountBalancesBar}>
                    <Descriptions> 
                        <Descriptions.Item label='Unrealized P&L'>
                            <Statistic
                            value={-3}
                            precision={0}
                            valueStyle={{ color: '#ff0000' }}
                            suffix='%'
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label='Total in BTC'>
                            <Statistic
                            value={12.00323}
                            precision={5}
                            valueStyle={{ color: '#ffff00' }}/>
                            </Descriptions.Item>
                        <Descriptions.Item label='Total in CAD'>
                            <Statistic
                            value={113383.23}
                            precision={2}
                            valueStyle={{ color: '#00ff00' }}/>
                            </Descriptions.Item>
                    </Descriptions>
            </div>
        )
    }
}

export default AccountBalancesBar

