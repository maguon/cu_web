import {createAction} from 'redux-actions';

export const getUserCnt = createAction('GET_USER_CNT');
export const getUserCarCnt = createAction('GET_USER_CAR_CNT');
export const getPoliceCnt = createAction('GET_POLICE_CNT');
export const getCheckCarCnt = createAction('GET_CHECK_CAR_CNT');
export const getOrderCnt = createAction('GET_ORDER_CNT');
export const getOrderPaymentCnt = createAction('GET_ORDER_PAYMENT_CNT');
export const getProfit = createAction('GET_PROFIT');
export const getPaymentFee = createAction('GET_PAYMENT_FEE');
export const getRefundFee = createAction('GET_REFUND_FEE');
export const getLogCnt = createAction('GET_LOG_CNT');
export const getLogWaitCnt = createAction('GET_LOG_WAIT_CNT');
export const getFeedBackCnt = createAction('GET_FEEDBACK_CNT');
export const getFeedBackWaitCnt = createAction('GET_FEEDBACK_WAIT_CNT');