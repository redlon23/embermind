import React, { Component } from 'react'
import Chart from 'chart.js'
import { Card } from 'antd'

export default class ProfitLossChart extends Component {
    state = {
        dailyProfit: [19, 15, 24, 8, 11, 10, 18],
        dailyLoss: [12, 13, 20, 5, 9, 7, 15],
        dailyLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        weeklyProfit: [19, 15, 24, 8, 11, 10, 18, 19],
        weeklyLoss: [12, 13, 20, 5, 9, 7, 15, 14],
        weeklyLabels: ['3/29-4/4', '4/5-4/11', '4/12-418', '4/19-4/25', '4/26-w/e', 'w/e-n/a', 'ya-na', 'hm-ha'],
        monthlyProfit: [19, 15, 24, 8, 11, 10, 18, 19, 12, 17, 24, 13],
        monthlyLoss: [12, 13, 20, 5, 9, 7, 15, 14, 8, 15, 19, 10],
        monthlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
    chartRef = React.createRef();

    componentDidMount(){
        const myChartRef = this.chartRef.current.getContext('2d')

        //get data

        new Chart(myChartRef, {
            type: 'bar',
            data: {
                labels: this.state.weeklyLabels,
                datasets: [{
                    label: "Profit",
                    barPercentage: 0.2,
                    categoryPercentage: 0.5,
                    data: this.state.weeklyProfit,
                    backgroundColor: "rgba(0, 255, 0 , 1)",
                },
                {
                    label: "Loss",
                    barPercentage: 0.2,
                    categoryPercentage: 0.5,
                    data: this.state.weeklyLoss,
                    backgroundColor: "rgba(255, 0, 0 , 1)",
                }]
            },
            options: {
                maintainAspectRatio:false,
                aspectRatio: 0.812,
                legend: {
                    labels: {
                        boxWidth: 5,
                        usePointStyle: true
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#555555',
                            zeroLineColor: '#555555',
                            drawBorder: false
                        },
                        ticks: {beginAtZero: true}
                    }]
                }
            }
        })
    }

    render() {
        
        return (
            <Card title='Profit/Loss'>
                <canvas
                    ref={this.chartRef}
                />
            </Card>
        )
    }
}