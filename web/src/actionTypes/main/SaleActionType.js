import {createAction} from 'redux-actions';

export const getSaleList = createAction('GET_SALE_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
// export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionPaymentStatus = createAction('SET_CONDITION_PAYMENT_STATUS');
export const setConditionProductId = createAction('SET_CONDITION_PRODUCT_ID');
export const setConditionProductName = createAction('SET_CONDITION_PRODUCT_NAME');
export const setConditionOrderId = createAction('SET_CONDITION_ORDER_ID');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');