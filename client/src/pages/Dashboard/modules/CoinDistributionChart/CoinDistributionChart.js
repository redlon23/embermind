import React, { Component } from 'react'
import Chart from 'chart.js'
import classes from './CoinDistributionChart.module.css'
import { Card } from 'antd'

export default class CoinDistributionChart extends Component{
    state = {
        coinLabels: ['ETHUSDT', 'BTCUSDT', 'BATUSDT', 'XRPUSDT'],
        distributionValues: [20, 20, 15, 7]
    }
    chartRef = React.createRef();

    componentDidMount(){
        const myChartRef = this.chartRef.current.getContext('2d')

        new Chart(myChartRef, {
            type: 'doughnut',
            data: {
                labels: this.state.coinLabels,
                datasets: [
                    {
                    data: this.state.distributionValues,
                    backgroundColor: ['rgba(225,20,20,1)', 'rgba(0,225,0,1)', 'rgba(0,0,225,1)', 'rgba(225,225,0,1)'],
                    borderWidth: 0.5,
                    hoverBorderWidth: 2,
                    hoverBackgroundColor: ['rgba(255,0,0,1)', 'rgba(0,255,0,1)', 'rgba(0,0,255,1)', 'rgba(255,255,0,1)']
                    }
                ]
            },
            options: {
                aspectRatio: 1.52,
                animation: {
                    animation: {
                        animateRotate: true,
                        animateScale: false
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 5,
                        usePointStyle: true
                    }
                },
                cutoutPercentage: 70
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