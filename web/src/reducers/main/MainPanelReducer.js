import {handleActions} from 'redux-actions';
import {MainPanelActionType} from '../../actionTypes';

const initialState = {
    // 绑定用户总数
    userCnt: 0,
    // 绑定车辆总数
    userCarCnt: 0,
    // 交警用户总数
    policeCnt: 0,
    // 本月扫描车辆
    checkCarCnt: 0,

    // 本月订单数
    orderCnt: 0,
    // 本月订单 支付成功订单数
    orderPaymentCnt: 0,

    // 本月商城收益
    profit: 0,
    // 支付金额
    paymentFee: 0,
    // 退款金额
    refundFee: 0,

    // 本月发布指令
    logCnt: 0,
    // 未发货 
    logWaitCnt: 0,

    // 本月申请售后数
    feedBackCnt: 0,
    // 未处理售后
    feedBackWaitCnt: 0
};

export default handleActions({
    [MainPanelActionType.getUserCnt]: (state, action) => {
        return {
            ...state,
            userCnt: action.payload
        }
    },
    [MainPanelActionType.getUserCarCnt]: (state, action) => {
        return {
            ...state,
            userCarCnt: action.payload
        }
    },
    [MainPanelActionType.getPoliceCnt]: (state, action) => {
        return {
            ...state,
            policeCnt: action.payload
        }
    },
    [MainPanelActionType.getCheckCarCnt]: (state, action) => {
        return {
            ...state,
            checkCarCnt: action.payload
        }
    },
    [MainPanelActionType.getOrderCnt]: (state, action) => {
        return {
            ...state,
            orderCnt: action.payload
        }
    },
    [MainPanelActionType.getOrderPaymentCnt]: (state, action) => {
        return {
            ...state,
            orderPaymentCnt: action.payload
        }
    },
    [MainPanelActionType.getProfit]: (state, action) => {
        return {
            ...state,
            profit: action.payload
        }
    },
    [MainPanelActionType.getPaymentFee]: (state, action) => {
        return {
            ...state,
            paymentFee: action.payload
        }
    },
    [MainPanelActionType.getRefundFee]: (state, action) => {
        return {
            ...state,
            refundFee: action.payload
        }
    },
    [MainPanelActionType.getLogCnt]: (state, action) => {
        return {
            ...state,
            logCnt: action.payload
        }
    },
    [MainPanelActionType.getLogWaitCnt]: (state, action) => {
        return {
            ...state,
            logWaitCnt: action.payload
        }
    },
    [MainPanelActionType.getFeedBackCnt]: (state, action) => {
        return {
            ...state,
            feedBackCnt: action.payload
        }
    },
    [MainPanelActionType.getFeedBackWaitCnt]: (state, action) => {
        return {
            ...state,
            feedBackWaitCnt: action.payload
        }
    }
}, initialState)