import {handleActions} from 'redux-actions';
import {PaymentDetailActionType} from '../../actionTypes';

const initialState = {
    // 发货详情
    paymentInfo: []
};

export default handleActions({
    [PaymentDetailActionType.getPaymentInfo]: (state, action) => {
        return {
            ...state,
            paymentInfo: action.payload
        }
    }
}, initialState)