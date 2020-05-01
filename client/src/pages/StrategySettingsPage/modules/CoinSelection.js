import React, { Component } from 'react'

import { Transfer } from 'antd'

class CoinSelection extends Component {
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
			selectedKeys: [],
			childProps: 'blah blah'
		}
	}

	componentDidMount() {
		this.props.sendSelectionToParent(this.state.childProps)
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
			<div>
				{console.log(this.state)}
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

export default CoinSelection
