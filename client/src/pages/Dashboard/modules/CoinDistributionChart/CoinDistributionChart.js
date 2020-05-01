import React, { Component } from 'react'
import Chart from 'chart.js'
import classes from './CoinDistributionChart.module.css'
import { Card } from 'antd'

export default class CoinDistributionChart extends Component{
    chartRef = React.createRef();

    componentDidMount(){
        const myChartRef = this.chartRef.current.getContext('2d')

        new Chart(myChartRef, {
            type: 'doughnut',
            data: {
                labels: ['ETHUSDT', 'BTCUSDT', 'BATUSDT', 'XRPUSDT'],
                datasets: [
                    {
                    data: [20, 20, 15, 7],
                    backgroundColor: ['red', 'green', 'blue', 'yellow'],
                    borderWidth: 0,
                    }
                ]
            },
            options: {
                animation: true,
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 5,
                        usePointStyle: true
                    }
                },
                cutoutPercentage: 90
            }
        })
    }
    render(){
        return (
            <Card title='Coin Distribution'>
                <canvas
                    ref={this.chartRef}
                />
            </Card>
        )
    }
}