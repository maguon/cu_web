import {handleActions} from 'redux-actions';
import {PaymentRefundModalActionType} from '../../actionTypes';

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
    [PaymentRefundModalActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [PaymentRefundModalActionType.setPaymentId]: (state, action) => {
        return {
            ...state,
            paymentId: action.payload
        }
    },
    [PaymentRefundModalActionType.setRefundMoney]: (state, action) => {
        return {
            ...state,
            refundMoney: action.payload
        }
    },
    [PaymentRefundModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)