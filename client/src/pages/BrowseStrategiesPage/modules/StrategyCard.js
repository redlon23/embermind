import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Card, Rate, Row, Col, Button, Tooltip, message } from 'antd'

const { Meta } = Card

class StrategyCard extends Component {
	equipStrategy = async () => {
		const response = await fetch('./api/equipStrategy', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ strategyName: this.props.strategyName })
		})
		const data = await response.json()
		console.log('RES: ' + JSON.stringify(data))
		if (response.status === 200) {
			message.success(data.message)
			// this.props.history.push('/')
			// this.props.history.push('/account-settings')
		} else {
			message.error(data.message)
		}
	}

	avgProfitPerTrade = this.props.details.avgProfitPerTrade * 100
	nearestHalfStar = parseFloat((Math.round(this.props.details.avgRating * 2) / 2).toFixed(1))

	posAvg = () => <div style={{ fontSize: '12pt', marginRight: '2rem', color: '#0DDD22' }}>+{this.avgProfitPerTrade}% Avg</div>

	negAvg = () => <div style={{ fontSize: '12pt', marginRight: '2rem', color: '#B40500' }}>{this.avgProfitPerTrade}% Avg</div>

	render() {
		return (
			<div className="BrowseStategiesCard" style={{ display: 'flex', flexDirection: 'row' }}>
				<img src={this.props.imgPath} alt="Strategy Img" style={{ width: '130px', height: '130px' }} />
				<Tooltip placement="topRight" title={`Average Rating: ${this.props.details.avgRating}/5`}>
					<Card
						title={this.props.strategyName}
						extra={<Rate disabled allowHalf defaultValue={this.nearestHalfStar} />}
						size="small"
						style={{ width: '31.5rem', height: '130px' }}
						headStyle={{ height: 0, fontSize: '14pt', border: 'none' }}
					>
						<Row>
							<Col span={12}>
								<Meta description={this.props.description} />
							</Col>
							<Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
								<Meta description={`${this.props.details.subscriberCount} Traders Using`} style={{ marginBottom: '0.1rem' }} />
								<Meta description={`${this.props.details.ratingCount} Ratings`} style={{ marginBottom: '0.1rem' }} />
								<Row>
									<Col
										span={24}
										style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}
									>
										{this.props.details.avgProfitPerTrade >= 0 ? this.posAvg() : this.negAvg()}
										<Button type="primary" size="small" onClick={this.equipStrategy} style={{ marginTop: '0.3rem' }}>
											Equip
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
					</Card>
				</Tooltip>
			</div>
		)
	}
}

export default withRouter(StrategyCard)
