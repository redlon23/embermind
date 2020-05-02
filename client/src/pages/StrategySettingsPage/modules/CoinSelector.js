import React, { Component } from 'react'

import { Transfer } from 'antd'

const headerStyle = {
	fontSize: '15pt',
	color: '#EBEBEB'
}

class CoinSelector extends Component {
	constructor(props) {
		super(props)

		const availableCoins = []
		for (let i = 0; i < this.props.availableCoins.length; i++) {
			availableCoins.push({
				key: i.toString(),
				title: this.props.availableCoins[i]
			})
		}

		let selectedCoinKeys = availableCoins.map((availCoin) => {
			for (let selectCoin of this.props.selectedCoins) {
				if (selectCoin === availCoin.title) {
					return availCoin.key
				}
			}
		})

		this.state = {
			availableCoins: availableCoins,
			selectedCoinKeys: selectedCoinKeys,
			selectedKeys: []
		}
	}

	componentDidUpdate() {
		this.sendUpdatedCoinsToParent()
	}

	sendUpdatedCoinsToParent = () => {
		let updatedSelectedCoins = this.state.availableCoins.map((availCoin) => {
			for (let key of this.state.selectedCoinKeys) {
				if (key === availCoin.key) {
					return availCoin.title
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
					dataSource={this.state.availableCoins}
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
