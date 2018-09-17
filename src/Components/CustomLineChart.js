import React from 'react';
import { Line as LineChart } from 'react-chartjs';



const options = {
    responsive: true,
    title: {
        display: true,
        text: 'Line Chart'
    },
    tooltips: {
        mode: 'label'
    },
    hover: {
        mode: 'dataset'
    },
    scales: {
        xAxes: [
            {
                display: true,
                scaleLabel: {
                    show: true,
                    labelString: 'Time'
                }
            }
        ],
        yAxes: [
            {
                display: true,
                scaleLabel: {
                    show: true,
                    labelString: 'Value'
                },
                ticks: {
                    suggestedMin: -10,
                    suggestedMax: 250
                }
            }
        ]
    }
}


class CustomLineChart extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.formatNumbersChartData();
    }


    


    render() {
        return (
            <div>
                <h3>Random Numbers Line Chart</h3>
                <LineChart data={this.props.data}
                    options={options}
                    width="600" height="250" redraw />
            </div>
        )
    }
}

export default CustomLineChart;
