import {createAction} from 'redux-actions';

export const getProductList = createAction('GET_PRODUCT_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionProductName = createAction('SET_CONDITION_PRODUCT_NAME');
export const setConditionProductType = createAction('SET_CONDITION_PRODUCT_TYPE');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');
export const setConditionSaleStatus = createAction('SET_CONDITION_SALE_STATUS');