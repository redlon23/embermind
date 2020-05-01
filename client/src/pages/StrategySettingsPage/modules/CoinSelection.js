import React, { Component } from 'react'

import { Transfer } from 'antd'

class CoinSelection extends Component {
	constructor(props) {
		super(props)

		const coins = []
		for (let i = 0; i < this.props.acceptedCoins.length; i++) {
			coins.push({
				key: i.toString(),
				title: this.props.acceptedCoins[i]
			})
			console.log('mock: ' + JSON.stringify(coins))
		}
		const oriTargetKeys = coins.filter((item) => +item.key % 3 > 1).map((item) => item.key)

		this.state = {
			sourceCoins: coins,
			selectedCoins: [],
			selectedKeys: oriTargetKeys,
			childProps: 'blah blah'
		}
	}

	componentDidMount() {
		this.props.sendSelectionToParent(this.state.childProps)
		console.log(this.props.acceptedCoins)
		// console.log('mock: ' + JSON.stringify(this.coins))
	}

	handleChange = (nextTargetKeys, direction, moveKeys) => {
		this.setState({ targetKeys: nextTargetKeys })

		console.log('targetKeys: ', nextTargetKeys)
		console.log('direction: ', direction)
		console.log('moveKeys: ', moveKeys)
	}

	handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
		this.setState({ selectedKeys: [ ...sourceSelectedKeys, ...targetSelectedKeys ] })

		console.log('sourceSelectedKeys: ', sourceSelectedKeys)
		console.log('targetSelectedKeys: ', targetSelectedKeys)
	}

	handleScroll = (direction, e) => {
		console.log('direction:', direction)
		console.log('target:', e.target)
	}

	render() {
		const { targetKeys, selectedKeys } = this.state
		return (
			<div>
				<Transfer
					dataSource={this.state.sourceCoins}
					titles={[ 'Source', 'Target' ]}
					targetKeys={targetKeys}
					selectedKeys={selectedKeys}
					onChange={this.handleChange}
					onSelectChange={this.handleSelectChange}
					onScroll={this.handleScroll}
					render={(item) => item.title}
				/>
			</div>
		)
	}
}

export default CoinSelection
