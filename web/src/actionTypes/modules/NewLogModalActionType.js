import {createAction} from 'redux-actions';

export const setOrderId= createAction('SET_ORDER_ID');
export const getOrderInfo = createAction('GET_ORDER_INFO');
export const getOrderItemList = createAction('GET_ORDER_ITEM_LIST');
export const setOrderItem= createAction('SET_ORDER_ITEM');
export const setOrderItemDes= createAction('SET_ORDER_ITEM_DES');
export const setOrderItemCnt= createAction('SET_ORDER_ITEM_CNT');
export const setLogList= createAction('SET_LOG_LIST');
export const setRecvName= createAction('SET_RECV_NAME');
export const setRecvPhone = createAction('SET_RECV_PHONE');
export const setRecvAddress = createAction('SET_RECV_ADDRESS');