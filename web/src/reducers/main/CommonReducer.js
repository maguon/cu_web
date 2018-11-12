import {handleActions} from 'redux-actions';
import {CommonActionType} from '../../actionTypes';

const initialState = {
    // 快递公司 列表
    logCoArray: [],
    // 订单详情
    orderInfo: [],
    // 订单内商品明细
    orderItem: [],
};

export default handleActions({
    [CommonActionType.getLogCoList]: (state, action) => {
        let logCoList = [];
        action.payload.forEach((value) => {
            logCoList.push({value: value.id, label: value.company_name})
        });
        return {
            ...state,
            logCoArray: logCoList
        }
    },
    [CommonActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [CommonActionType.getOrderItem]: (state, action) => {
        return {
            ...state,
            orderItem: action.payload
        }
    }
}, initialState)

