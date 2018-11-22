import {handleActions} from 'redux-actions';
import {FeedBackDetailActionType} from '../../actionTypes';

const initialState = {
    // 订单信息TAB - 订单详情
    orderInfo: [],
    // 订单信息TAB：订单内，商品列表
    productArray: [],
    // 订单信息TAB - 支付信息
    paymentInfo: [],
    // 订单信息TAB - 发货信息
    logInfo: [],

    // 售后信息TAB：售后信息
    feedBackInfo: [],
    // 售后信息TAB：处理描述
    processRemark: '',
    // 售后信息TAB：处理方法
    processMethod: ''
};

export default handleActions({
    [FeedBackDetailActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [FeedBackDetailActionType.getProductList]: (state, action) => {
        return {
            ...state,
            productArray: action.payload
        }
    },
    [FeedBackDetailActionType.getPaymentInfo]: (state, action) => {
        return {
            ...state,
            paymentInfo: action.payload
        }
    },
    [FeedBackDetailActionType.getLogInfo]: (state, action) => {
        return {
            ...state,
            logInfo: action.payload
        }
    },

    [FeedBackDetailActionType.getFeedBackInfo]: (state, action) => {
        return {
            ...state,
            feedBackInfo: action.payload
        }
    },
    [FeedBackDetailActionType.setProcessRemark]: (state, action) => {
        return {
            ...state,
            processRemark: action.payload
        }
    },
    [FeedBackDetailActionType.setProcessMethod]: (state, action) => {
        return {
            ...state,
            processMethod: action.payload
        }
    }
}, initialState)