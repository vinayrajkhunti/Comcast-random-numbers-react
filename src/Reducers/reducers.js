import * as types from '../constants/ActionTypes';

const initialState = {
    userInput: '',
    randomNumbers: [],
    numbersLineChart: {},
    reloadChart: false
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_RANDOMNUMBERS:
            return {
                ...state,
                randomNumbers: action.randomNumbers,
                reloadChart: true
            };
        case types.UPDATE_USER_INPUT:
            return {
                ...state,
                userInput: action.value
            }
        case types.FORMAT_NUMBERS_CHART_DATA:
            return {
                ...state,
                numbersLineChart: action.value
            }
        case types.RELOAD_CHART:
            return {
                ...state,
                reloadChart: action.value
            }
        default:
            return state;
    }
}
