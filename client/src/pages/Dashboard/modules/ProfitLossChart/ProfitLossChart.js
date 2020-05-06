import React, { Component } from 'react'
import Chart from 'chart.js'
import { Card } from 'antd'

export default class ProfitLossChart extends Component {
    chartRef = React.createRef();

    componentDidMount(){
        const myChartRef = this.chartRef.current.getContext('2d')

        //get data

        new Chart(myChartRef, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: "Profit",
                    barPercentage: 0.2,
                    categoryPercentage: 0.5,
                    data: [19, 15, 24, 8, 11, 10, 18, 19, 12, 17, 24, 13],
                    backgroundColor: "rgba(0, 255, 0 , 1)"
                },
                {
                    label: "Loss",

                    barPercentage: 0.2,
                    categoryPercentage: 0.5,
                    data: [12, 13, 20, 5, 9, 7, 15, 14, 8, 15, 19, 10],
                    backgroundColor: "rgba(255, 0, 0 , 1)"
                }]
            },
            options: {
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
                            zeroLineWidth: 0,
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