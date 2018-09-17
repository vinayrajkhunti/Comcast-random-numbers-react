import * as types from '../constants/ActionTypes';
import getJSONData from '../Api/getJsonData';

Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}
export const onReloadChart = () => {
    return (dispatch, getState) => {
        dispatch({
            type: types.RELOAD_CHART,
            value: false,
        });
    }
}
export function getRandomNumbersList() {
    return (dispatch, getState) => {
        const number = getState().data.userInput;
        getJSONData((data) => {
            const filteredText = data.replace(/\n/g, ' ');

            dispatch({
                type: types.FETCH_RANDOMNUMBERS,
                randomNumbers: filteredText.split(' '),
            });
            formatNumbersChartData();
        }, number);
        function parseFormat(strArg) {
            console.log('17', strArg);
            var
                category,
                output = {},  // Output
                str = strArg.trim();  // Remove unwanted space before processing

            str.split('\n').forEach(function (line) {
                var item = line.split('.');
                if (!output[category]) { output[category] = []; }
                if (item[0].match(/\d/)) {  // Match a decimal number
                    // Remove unwanted space & push
                    if (item[1]) output[category].push(item[1].trim());
                } else if (item[0].match(/\D/)) {  // Match UPPERCASE alphabet
                    // Remove unwanted space
                    category = item[1].trim();
                    output[category] = []
                }
            });
            return output;
        }
    }
}

export const formatNumbersChartData = () => {
    return (dispatch, getState) => {
        const numbers = getState().data.randomNumbers;
        const labels = [];
        const chartvalues = [];
        const currentTime = new Date();
        numbers.forEach((number, i) => {
            if (number) {
                labels.push(add_hours(currentTime, i));
                chartvalues.push(parseInt(number));
            }
        })
        function add_hours(dt, hours) {
            return formatDate(new Date(dt).addHours(hours));
        }
        function formatDate(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
        }

        dispatch({
            type: types.FORMAT_NUMBERS_CHART_DATA,
            value: {
                labels: labels,
                datasets: [
                    {
                        label: 'Random Numbers',
                        fillColor: 'rgba(25, 70, 232,0.6)',
                        strokeColor: 'rgba(25, 70, 232,1)',
                        pointColor: 'rgba(25, 70, 232,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(25, 70, 232,1)',
                        data: chartvalues,
                    }
                ]
            }
        })
    }
}

export function onUserInputUpdate(value) {
    return (dispatch, getState) => {
        dispatch({
            type: types.UPDATE_USER_INPUT,
            value: value
        })
    }
}


