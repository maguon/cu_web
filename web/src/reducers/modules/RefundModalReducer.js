import {handleActions} from 'redux-actions';
import {RefundModalActionType} from '../../actionTypes';

const initialState = {
    // 订单详细信息
    orderInfo: [],
    // 支付编号
    paymentId: '',
    // 本次退款
    refundMoney: '',
    // 处理描述
    remark: ''
};

export default handleActions({
    [RefundModalActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [RefundModalActionType.setPaymentId]: (state, action) => {
        return {
            ...state,
            paymentId: action.payload
        }
    },
    [RefundModalActionType.setRefundMoney]: (state, action) => {
        return {
            ...state,
            refundMoney: action.payload
        }
    },
    [RefundModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)