import {handleActions} from 'redux-actions';
import {MessageStatisticActionType} from '../../actionTypes';

const initialState = {
    // 消息发送-按月统计：开始月
    monthStart: '201101',
    // 消息发送-按月统计：终了月
    monthEnd: '201108',
    // 消息发送-按日统计：开始日
    dayStart: '',
    // 消息发送-按日统计：终了日
    dayEnd: ''
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
    [MessageStatisticActionType.setDayStart]: (state, action) => {
        return {
            ...state,
            dayStart: action.payload
        }
    },
    [MessageStatisticActionType.setDayEnd]: (state, action) => {
        return {
            ...state,
            dayEnd: action.payload
        }
    }
}, initialState)