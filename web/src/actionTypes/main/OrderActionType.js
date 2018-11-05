import {createAction} from 'redux-actions';

export const getOrderList = createAction('GET_ORDER_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionUser = createAction('SET_CONDITION_USER');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');
export const setConditionPaymentStatus = createAction('SET_CONDITION_PAYMENT_STATUS');
export const setConditionLogStatus = createAction('SET_CONDITION_LOG_STATUS');