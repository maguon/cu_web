import {handleActions} from 'redux-actions';
import {PaymentDetailActionType} from '../../actionTypes';

const initialState = {
    // 支付详情
    paymentInfo: [],
    // 关联支付列表
    relPaymentArray: []
};

export default handleActions({
    [PaymentDetailActionType.getPaymentInfo]: (state, action) => {
        return {
            ...state,
            paymentInfo: action.payload
        }
    },
    [PaymentDetailActionType.getRelPaymentList]: (state, action) => {
        return {
            ...state,
            relPaymentArray: action.payload
        }
    }
}, initialState)