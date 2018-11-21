import {createAction} from 'redux-actions';

export const getFeedBackList = createAction('GET_FEED_BACK_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionOrderId = createAction('SET_CONDITION_ORDER_ID');
export const setConditionUser = createAction('SET_CONDITION_USER');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');
export const setConditionUpdatedOnStart = createAction('SET_CONDITION_UPDATED_ON_START');
export const setConditionUpdatedOnEnd = createAction('SET_CONDITION_UPDATED_ON_END');
export const setConditionStatus = createAction('SET_CONDITION_STATUS');