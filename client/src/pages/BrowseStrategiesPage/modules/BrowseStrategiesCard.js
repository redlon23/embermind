import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Card, Avatar } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

const { Meta } = Card

class BrowseStrategiesCard extends Component {
	render() {
		return (
			<div className="BrowseStategiesCard" style={{ display: 'flex', flexDirection: 'row' }}>
				<img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{ width: '150px' }} />
				<Card title="Default size card" style={{ width: 250 }}>
					<Meta
						title="Card title"
						description="This is the description"
						actions={[ <SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" /> ]}
					/>
				</Card>
			</div>
		)
	}
}

export default withRouter(BrowseStrategiesCard)
