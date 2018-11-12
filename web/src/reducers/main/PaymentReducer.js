import {handleActions} from 'redux-actions';
import {PaymentActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：支付编号
    conditionNo: '',
    // 检索条件：支付类型
    conditionPaymentType: null,
    // 检索条件：支付人
    conditionPaymentUser: '',
    // 检索条件：绑定手机
    conditionBindPhone: '',

    // 检索条件：关联订单
    conditionOrder: '',
    // 检索条件：支付时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：支付时间(终)
    conditionCreatedOnEnd: '',

    // 发货记录 检索结果列表
    paymentArray: []
};

export default handleActions({
    [PaymentActionType.getPaymentList]: (state, action) => {
        return {
            ...state,
            paymentArray: action.payload
        }
    },
    [PaymentActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [PaymentActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },


    [PaymentActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [PaymentActionType.setConditionPaymentType]: (state, action) => {
        return {
            ...state,
            conditionPaymentType: action.payload
        }
    },
    [PaymentActionType.setConditionPaymentUser]: (state, action) => {
        return {
            ...state,
            conditionPaymentUser: action.payload
        }
    },
    [PaymentActionType.setConditionBindPhone]: (state, action) => {
        return {
            ...state,
            conditionBindPhone: action.payload
        }
    },




    [PaymentActionType.setConditionOrder]: (state, action) => {
        return {
            ...state,
            conditionOrder: action.payload
        }
    },
    [PaymentActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [PaymentActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    }
}, initialState)