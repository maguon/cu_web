import {handleActions} from 'redux-actions';
import {MessageStatisticActionType} from '../../actionTypes';

const initialState = {
    // 新增用户-按月统计：开始月
    monthStart: '',
    // 新增用户-按月统计：终了月
    monthEnd: '',
    // 新增用户-按日统计：统计日数
    dataSize: ''
};

export default handleActions({
    [MessageStatisticActionType.setMonthStart]: (state, action) => {
        return {
            ...state,
            monthStart: action.payload
        }
    },
    [MessageStatisticActionType.setMonthEnd]: (state, action) => {
        return {
            ...state,
            monthEnd: action.payload
        }
    },
    [MessageStatisticActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    }
}, initialState)