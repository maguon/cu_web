import {createAction} from 'redux-actions';

export const getPaymentList = createAction('GET_PAYMENT_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionPaymentType = createAction('SET_CONDITION_PAYMENT_TYPE');
export const setConditionPaymentUser = createAction('SET_CONDITION_PAYMENT_USER');
export const setConditionBindPhone = createAction('SET_CONDITION_BIND_PHONE');
export const setConditionOrder = createAction('SET_CONDITION_ORDER');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');