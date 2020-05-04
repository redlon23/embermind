import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Card, Rate, Row, Col, Button, Tooltip } from 'antd'

const { Meta } = Card

class StrategyCard extends Component {
	avgProfitPerTrade = this.props.avgProfitPerTrade * 100
	nearestHalfStar = parseFloat((Math.round(this.props.avgRating * 2) / 2).toFixed(1))

	posAvg = () => <div style={{ fontSize: '12pt', marginRight: '2rem', color: '#0DDD22' }}>+{this.avgProfitPerTrade}% Avg</div>

	negAvg = () => <div style={{ fontSize: '12pt', marginRight: '2rem', color: '#B40500' }}>{this.avgProfitPerTrade}% Avg</div>

	render() {
		return (
			<div className="BrowseStategiesCard" style={{ display: 'flex', flexDirection: 'row' }}>
				<img src={this.props.imgPath} style={{ width: '130px', height: '130px' }} />
				<Tooltip placement="topRight" title={`Average Rating: ${this.props.avgRating}/5`}>
					<Card
						title={this.props.title}
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
								<Meta description={`${this.props.subscriberCount} Traders Using`} style={{ marginBottom: '0.1rem' }} />
								<Meta description={`${this.props.ratingCount} Ratings`} style={{ marginBottom: '0.1rem' }} />
								<Row>
									<Col
										span={24}
										style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}
									>
										{this.avgProfitPerTrade >= 0 ? this.posAvg() : this.negAvg()}
										<Button
											type="primary"
											size="small"
											onClick={console.log('Clicked: ' + this.props.title)}
											style={{ marginTop: '0.3rem' }}
										>
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
