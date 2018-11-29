import {handleActions} from 'redux-actions';
import {CheckCarStatisticActionType} from '../../actionTypes';

const initialState = {
    // 按月统计：开始月
    monthStart: '',
    // 按月统计：终了月
    monthEnd: '',
    // 按日统计：统计日数
    dataSize: ''
};

export default handleActions({
    [CheckCarStatisticActionType.setMonthStart]: (state, action) => {
        return {
            ...state,
            monthStart: action.payload
        }
    },
    [CheckCarStatisticActionType.setMonthEnd]: (state, action) => {
        return {
            ...state,
            monthEnd: action.payload
        }
    },
    [CheckCarStatisticActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    }
}, initialState)