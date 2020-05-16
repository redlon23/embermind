import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './StrategyCard.scss'

import { Card, Rate, Row, Col, Button, message } from 'antd'

const { Meta } = Card

class StrategyCard extends Component {
	constructor(props) {
		super(props)
		this.state = { isEquipped: null }
	}

	componentDidMount = async () => {
		const response = await fetch(`./api/getStrategyEquippedStatus?strategyName=${this.props.strategyName}`)
		const data = await response.json()

		if (response.status === 200) {
			this.setState({ isEquipped: data.strategyIsEquipped })
		} else {
			message.error(data.message)
		}
	}

	equipStrategy = async () => {
		const response = await fetch(
			this.state.isEquipped
				? `./api/unequipStrategy?strategyName=${this.props.strategyName}`
				: `./api/equipStrategy?strategyName=${this.props.strategyName}`
		)
		const data = await response.json()
		if (response.status === 200) {
			message.success(data.message)
			this.setState({ isEquipped: !this.state.isEquipped })
		} else {
			message.error(data.message)
		}
	}

	avgProfitPerTrade = this.props.details.avgProfitPerTrade * 100
	nearestHalfStar = parseFloat((Math.round(this.props.details.avgRating * 2) / 2).toFixed(1))

	posAvg = () => <div className="posAvgText">+{this.avgProfitPerTrade}% Avg</div>

	negAvg = () => <div className="negAvgText">{this.avgProfitPerTrade}% Avg</div>

	render() {
		return (
			<div className="BrowseStategiesCard">
				<img className="cardImg" src={`${process.env.PUBLIC_URL} ${this.props.imgPath}`} alt="Strategy Img" />
				<Card
					className="cardBody"
					title={this.props.strategyName}
					extra={<Rate disabled allowHalf defaultValue={this.nearestHalfStar} />}
					size="small"
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
								<Col span={24} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
									{this.props.details.avgProfitPerTrade >= 0 ? this.posAvg() : this.negAvg()}
									{this.state.isEquipped ? (
										<Button type="primary" size="small" onClick={this.equipStrategy} style={{ marginTop: '0.3rem' }}>
											Unequip
										</Button>
									) : (
										<Button type="ghost" size="small" onClick={this.equipStrategy} style={{ marginTop: '0.3rem' }}>
											Equip
										</Button>
									)}
								</Col>
							</Row>
						</Col>
					</Row>
				</Card>
			</div>
		)
	}
}

export default withRouter(StrategyCard)
