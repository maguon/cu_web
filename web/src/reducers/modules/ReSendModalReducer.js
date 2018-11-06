import {handleActions} from 'redux-actions';
import {RefundModalActionType} from '../../actionTypes';

const initialState = {
    // 申请原因
    applyReason: '',
    // 已退款金额
    refundMoney: 0,
    // 退款金额
    newRefund: ''
};

export default handleActions({
    [RefundModalActionType.setApplyReason]: (state, action) => {
        return {
            ...state,
            applyReason: action.payload
        }
    },
    [RefundModalActionType.setRefundMoney]: (state, action) => {
        return {
            ...state,
            refundMoney: action.payload
        }
    },
    [RefundModalActionType.setNewRefund]: (state, action) => {
        return {
            ...state,
            newRefund: action.payload
        }
    }
}, initialState)

