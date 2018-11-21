import {createAction} from 'redux-actions';

export const getOrderInfo = createAction('GET_ORDER_INFO');
export const getProductList = createAction('GET_PRODUCT_LIST');
export const getFeedBackInfo = createAction('GET_FEED_BACK_INFO');

export const setProcessRemark = createAction('SET_PROCESS_REMARK');
export const setProcessMethod = createAction('SET_PROCESS_METHOD');