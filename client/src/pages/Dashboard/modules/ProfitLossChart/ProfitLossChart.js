import React, { Component } from 'react'
import Chart from 'chart.js'
import { Card } from 'antd'

import './ProfitLossChart.scss'

export default class ProfitLossChart extends Component {
	state = {
		dailyPnLData: {},
		weeklyPnLData: {},
		monthlyPnLData: {},
		dailyLabels: []
	}
	chartRef = React.createRef()

	async componentDidMount() {
		const processPnL = async (data) => {
			var result = { gain: [], loss: [] }
			for (let i = 0; i < data.length; i++) {
				result.gain.push(data[i].gain)
				result.loss.push(Math.abs(data[i].loss))
			}
			return result
		}
		const myChartRef = this.chartRef.current.getContext('2d')

		const dailyResp = await fetch('/api/getDailyPnL')
		const dailyData = await dailyResp.json()
		console.log(dailyData)
		const weeklyResp = await fetch('/api/getWeeklyPnL')
		const weeklyData = await weeklyResp.json()
		console.log(weeklyData)
		const monthlyResp = await fetch('/api/getMonthlyPnL')
		const monthlyData = await monthlyResp.json()
		console.log(monthlyData)

		this.setState({ dailyPnLData: await processPnL(dailyData) })
		console.log(this.state.dailyPnLData)

		new Chart(myChartRef, {
			type: 'bar',
			data: {
				labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
				datasets: [
					{
						label: 'Profit',
						barPercentage: 0.2,
						categoryPercentage: 0.5,
						data: this.state.dailyPnLData.gain,
						backgroundColor: 'rgba(0, 255, 0 , 1)'
					},
					{
						label: 'Loss',
						barPercentage: 0.2,
						categoryPercentage: 0.5,
						data: this.state.dailyPnLData.loss,
						backgroundColor: 'rgba(255, 0, 0 , 1)'
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				aspectRatio: 0.612,
				legend: {
					labels: {
						boxWidth: 5,
						usePointStyle: true
					}
				},
				scales: {
					xAxes: [
						{
							gridLines: {
								display: false
							}
						}
					],
					yAxes: [
						{
							gridLines: {
								color: '#555555',
								zeroLineWidth: 0,
								drawBorder: false
							},
							ticks: { beginAtZero: true }
						}
					]
				}
			}
		})
	}

	render() {
		return (
			<div className="ProfitLoss">
				<Card title="Profit/Loss">
					<canvas ref={this.chartRef} />
				</Card>
			</div>
		)
	}
}
