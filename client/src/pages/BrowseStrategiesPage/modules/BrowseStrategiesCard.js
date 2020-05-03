import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Card, Rate, Row, Col, Button } from 'antd'

const { Meta } = Card

class BrowseStrategiesCard extends Component {
	render() {
		return (
			<div
				className="BrowseStategiesCard"
				style={{ display: 'flex', flexDirection: 'row' }}
				onClick={console.log('Clicked: ' + this.props.title)}
			>
				<img src={this.props.imgPath} style={{ width: '130px', height: '130px' }} />
				<Card
					title={this.props.title}
					extra={<Rate disabled allowHalf defaultValue={this.props.avgRating} />}
					size="small"
					style={{ width: '31.5rem', height: '130px' }}
					headStyle={{ height: 0, fontSize: '14pt', border: 'none' }}
				>
					<Row>
						<Col span={12}>
							<Meta description={this.props.description} />
						</Col>
						<Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
							<Meta description={`${this.props.subscriberCount} Subscribers`} style={{ marginBottom: '0.1rem' }} />
							<Meta description={`${this.props.ratingCount} Ratings`} style={{ marginBottom: '0.1rem' }} />
							<Button type="primary" size="small" style={{ marginTop: '0.4rem' }}>
								Equip
							</Button>
						</Col>
					</Row>
				</Card>
			</div>
		)
	}
}

export default withRouter(BrowseStrategiesCard)
