import {handleActions} from 'redux-actions';
import {OrderDetailActionType} from '../../actionTypes';

const initialState = {
    // 订单管理 - 订单详情
    orderInfo: [],

    // 订单信息TAB：订单内，商品列表
    productArray: [],
};

export default handleActions({
    [OrderDetailActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [OrderDetailActionType.getProductList]: (state, action) => {
        return {
            ...state,
            productArray: action.payload
        }
    },



}, initialState)