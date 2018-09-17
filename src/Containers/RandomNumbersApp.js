import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomLineChart from '../Components/CustomLineChart';
import { getRandomNumbersList, onUserInputUpdate, formatNumbersChartData, onReloadChart } from '../Actions/actions';


export class RandomNumbersApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reloadChart: false
        }
    }

    onUserInput(e) {
        this.props.onUserInputUpdate(e.target.value);
    }
    onLoadClick() {
        this.props.onReloadChart();
        this.props.getRandomNumbersList();
    }

    render() {
        const { userInput, randomNumbers, numbersLineChart, formatNumbersChartData, reloadChart } = this.props;

        return (
            <div className='container'>
                <div className="search-section">
                    <div className="user-input-section">
                        <input type="number" className="user-input" value={userInput} onChange={(e) => this.onUserInput(e)} />
                        <button className="load-btn" disabled={!userInput} onClick={() => this.onLoadClick()}>Load</button>
                    </div>
                </div>
                {reloadChart === true && <CustomLineChart data={numbersLineChart}
                    formatNumbersChartData={formatNumbersChartData} />
                }
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    getRandomNumbersList,
    onUserInputUpdate,
    onReloadChart,
    formatNumbersChartData
}, dispatch)

function mapStateToProps(state) {
    return {
        userInput: state.data.userInput,
        randomNumbers: state.data.randomNumbers,
        numbersLineChart: state.data.numbersLineChart,
        reloadChart: state.data.reloadChart
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RandomNumbersApp)

