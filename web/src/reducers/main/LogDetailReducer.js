import {handleActions} from 'redux-actions';
import {LogDetailActionType} from '../../actionTypes';

const initialState = {
    // 发货详情
    logInfo: [],
    // 订单详情
    orderInfo: [],
};

export default handleActions({
    [LogDetailActionType.getLogInfo]: (state, action) => {
        return {
            ...state,
            logInfo: action.payload
        }
    },
    [LogDetailActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    }
}, initialState)