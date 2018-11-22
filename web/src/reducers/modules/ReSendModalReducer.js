import {handleActions} from 'redux-actions';
import {ReSendModalActionType} from '../../actionTypes';

const initialState = {
    // 订单编号
    orderId: '',
    // 订单详细信息
    orderInfo: [],
    // 订单内商品列表
    orderItemArray: [],
    // 商品名称select
    orderItem: null,
    // 商品数量
    orderItemCnt: '',
    // 新增发货商品列表Map
    logList: [],

    // 收货人
    recvName: '',
    // 收货电话
    recvPhone: '',
    // 收货地址
    recvAddress: ''
};

export default handleActions({
    [ReSendModalActionType.setOrderId]: (state, action) => {
        return {
            ...state,
            orderId: action.payload
        }
    },
    [ReSendModalActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [ReSendModalActionType.getOrderItemList]: (state, action) => {
        let orderItemList = [];
        action.payload.forEach((value) => {
            orderItemList.push({value: value.id, label: value.product_name + ' (' + value.remark + ')', 'cnt': value.prod_count})
        });
        return {
            ...state,
            orderItemArray: orderItemList
        }
    },
    [ReSendModalActionType.setOrderItem]: (state, action) => {
        return {
            ...state,
            orderItem: action.payload
        }
    },
    [ReSendModalActionType.setOrderItemCnt]: (state, action) => {
        return {
            ...state,
            orderItemCnt: action.payload
        }
    },
    [ReSendModalActionType.setLogList]: (state, action) => {
        return {
            ...state,
            logList: action.payload
        }
    },
    [ReSendModalActionType.setRecvName]: (state, action) => {
        return {
            ...state,
            recvName: action.payload
        }
    },
    [ReSendModalActionType.setRecvPhone]: (state, action) => {
        return {
            ...state,
            recvPhone: action.payload
        }
    },
    [ReSendModalActionType.setRecvAddress]: (state, action) => {
        return {
            ...state,
            recvAddress: action.payload
        }
    }
}, initialState)