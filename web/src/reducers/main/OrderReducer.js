import {handleActions} from 'redux-actions';
import {OrderActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：订单编号
    conditionNo: '',
    // 检索条件：购买人
    conditionUser: '',
    // 检索条件：手机
    conditionPhone: '',
    // 检索条件：下单时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：下单时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：付款状态
    conditionPaymentStatus: null,
    // 检索条件：发货状态
    conditionLogStatus: null,

    // 订单检索结果列表
    orderArray: []
};

export default handleActions({
    [OrderActionType.getOrderList]: (state, action) => {
        return {
            ...state,
            orderArray: action.payload
        }
    },
    [OrderActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [OrderActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [OrderActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [OrderActionType.setConditionUser]: (state, action) => {
        return {
            ...state,
            conditionUser: action.payload
        }
    },
    [OrderActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [OrderActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [OrderActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [OrderActionType.setConditionPaymentStatus]: (state, action) => {
        return {
            ...state,
            conditionPaymentStatus: action.payload
        }
    },
    [OrderActionType.setConditionLogStatus]: (state, action) => {
        return {
            ...state,
            conditionLogStatus: action.payload
        }
    }
}, initialState)

