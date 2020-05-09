import React, { Component } from 'react'

import { Transfer } from 'antd'

const headerStyle = {
	fontSize: '15pt',
	color: '#EBEBEB'
}

class CoinSelector extends Component {
	constructor(props) {
		super(props)

		const supportedCoins = []
		for (let i = 0; i < this.props.supportedCoins.length; i++) {
			supportedCoins.push({
				key: i.toString(),
				title: this.props.supportedCoins[i]
			})
		}

		let selectedCoinKeys = supportedCoins.map((supCoin) => {
			for (let selectCoin of this.props.selectedCoins) {
				if (selectCoin === supCoin.title) {
					return supCoin.key
				}
			}
		})

		this.state = {
			supportedCoins: supportedCoins,
			selectedCoinKeys: selectedCoinKeys,
			selectedKeys: []
		}
	}

	componentDidUpdate() {
		this.sendUpdatedCoinsToParent()
	}

	sendUpdatedCoinsToParent = () => {
		let updatedSelectedCoins = this.state.supportedCoins.map((supCoin) => {
			for (let key of this.state.selectedCoinKeys) {
				if (key === supCoin.key) {
					return supCoin.title
				}
			}
		})
		updatedSelectedCoins = updatedSelectedCoins.filter((coin) => coin) //removes null values
		this.props.updateSelectedCoins(updatedSelectedCoins)
	}

	handleChange = (nextselectedCoinKeys) => {
		this.setState({ selectedCoinKeys: nextselectedCoinKeys })
	}

	handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
		this.setState({ selectedKeys: [ ...sourceSelectedKeys, ...targetSelectedKeys ] })
	}

	render() {
		const { selectedCoinKeys, selectedKeys } = this.state
		return (
			<div className="CoinSelector" style={headerStyle}>
				Coin Selection
				<Transfer
					dataSource={this.state.supportedCoins}
					titles={[ 'Available', 'Selected' ]}
					targetKeys={selectedCoinKeys}
					selectedKeys={selectedKeys}
					onChange={this.handleChange}
					onSelectChange={this.handleSelectChange}
					render={(coin) => coin.title}
				/>
			</div>
		)
	}
}

export default CoinSelector
