import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './StrategyCard.scss'

import { Card, Rate, Row, Col, Button, Tooltip, message } from 'antd'

const { Meta } = Card

class StrategyCard extends Component {
	constructor(props) {
		super(props)
		this.state = { isEquipped: null, avgRating: this.avgNearestHalfStar, userRating: null, renderDataLoaded: false }
	}

	componentDidMount = async () => {
		const response = await fetch(`./api/getStrategyEquippedAndRatingStatus?strategyName=${this.props.strategyName}`)
		const data = await response.json()
		if (response.status === 200) {
			console.log(JSON.stringify(data))
			this.setState({ isEquipped: data.strategyIsEquipped, userRating: data.userRating, renderDataLoaded: true }, () => {
				console.log(JSON.stringify(this.state))
			})
		} else {
			message.error(data.message)
		}
	}

	setUserStrategyRating = async (userRating) => {
		const response = await fetch(`./api/setUserStrategyRating?userRating=${userRating}`)
		const data = await response.json()
		if (response.status === 200) {
			message.success(data.message)
			if (!data.userRating) {
				this.props.history.push('/')
				this.props.history.push('/browse-strategies')
			} else {
				this.setState({ userRating: data.userRating })
			}
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
	avgNearestHalfStar = parseFloat((Math.round(this.props.details.avgRating * 2) / 2).toFixed(1))

	posAvg = () => <div className="posAvgText">+{this.avgProfitPerTrade}% Avg</div>

	negAvg = () => <div className="negAvgText">{this.avgProfitPerTrade}% Avg</div>

	render() {
		return (
			<div>
				{this.state.renderDataLoaded ? (
					<div className="BrowseStategiesCard">
						<img className="cardImg" src={`${process.env.PUBLIC_URL} ${this.props.imgPath}`} alt="Strategy Img" />
						<Tooltip placement="topRight" align={{ offset: [ 5, 20 ] }} title={`Avg Rating: ${this.props.details.avgRating}`}>
							<Card
								className="cardContent"
								title={this.props.strategyName}
								extra={
									<Rate
										allowHalf
										defaultValue={this.state.userRating ? this.state.userRating : this.state.avgRating}
										style={this.state.userRating ? { color: '#094d7a' } : { color: '#FADB14' }}
										onChange={(rating) => {
											this.setUserStrategyRating(rating)
										}}
									/>
								}
								size="small"
								headStyle={{ height: 0, fontSize: '14pt', border: 'none' }}
							>
								<Row>
									<Col span={15}>
										<Meta description={this.props.description} />
									</Col>
									<Col className="endContainer" span={9}>
										<Meta className="statsText" description={`${this.props.details.subscriberCount} Traders Using`} />
										<Meta className="statsText" description={`${this.props.details.ratingCount} Ratings`} />
										<Row className="bottomRow">
											<Col span={24} className="bottomContainer">
												{this.props.details.avgProfitPerTrade >= 0 ? this.posAvg() : this.negAvg()}
												{this.state.isEquipped ? (
													<Button type="ghost" size="small" onClick={this.equipStrategy}>
														Unequip
													</Button>
												) : (
													<Button type="primary" size="small" onClick={this.equipStrategy}>
														Equip
													</Button>
												)}
											</Col>
										</Row>
									</Col>
								</Row>
							</Card>
						</Tooltip>
					</div>
				) : null}
			</div>
		)
	}
}

export default withRouter(StrategyCard)
