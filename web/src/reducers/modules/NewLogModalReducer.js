import {handleActions} from 'redux-actions';
import {LogActionType, NewLogModalActionType} from '../../actionTypes';

const initialState = {
    // 订单编号
    orderId: '',
    // 订单详细信息
    orderInfo: [],
    // 订单内商品列表
    orderItemArray: [],
    // 订单内商品数量列表
    orderItemCntMap: {},
    // 商品名称
    orderItem: null,
    // 商品数量
    orderItemCnt: '',
    // 收货人
    recvName: '',
    // 收货电话
    recvPhone: '',
    // 收货地址
    recvAddress: ''
};

export default handleActions({
    [NewLogModalActionType.setOrderId]: (state, action) => {
        return {
            ...state,
            orderId: action.payload
        }
    },
    [NewLogModalActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [NewLogModalActionType.getOrderItemList]: (state, action) => {
        let orderItemList = [];
        action.payload.forEach((value) => {
            orderItemList.push({value: value.id, label: value.product_name})
        });
        return {
            ...state,
            orderItemArray: orderItemList
        }
    },
    [NewLogModalActionType.getOrderItemCntList]: (state, action) => {
        let orderItemCntMap = new Map();
        action.payload.forEach((value) => {
            orderItemCntMap.set(value.id, value.prod_count)
        });
        return {
            ...state,
            orderItemCntMap: orderItemCntMap
        }
    },
    [NewLogModalActionType.setOrderItem]: (state, action) => {
        return {
            ...state,
            orderItem: action.payload
        }
    },
    [NewLogModalActionType.setOrderItemCnt]: (state, action) => {
        return {
            ...state,
            orderItemCnt: action.payload
        }
    },
    [NewLogModalActionType.setRecvName]: (state, action) => {
        return {
            ...state,
            recvName: action.payload
        }
    },
    [NewLogModalActionType.setRecvPhone]: (state, action) => {
        return {
            ...state,
            recvPhone: action.payload
        }
    },
    [NewLogModalActionType.setRecvAddress]: (state, action) => {
        return {
            ...state,
            recvAddress: action.payload
        }
    }
}, initialState)