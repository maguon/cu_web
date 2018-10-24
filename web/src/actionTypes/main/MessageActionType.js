import {createAction} from 'redux-actions';

export const getMessageList = createAction('GET_MESSAGE_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');

export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionBindUser = createAction('SET_CONDITION_BIND_USER');
export const setConditionMsgType = createAction('SET_CONDITION_MSG_TYPE');
export const setConditionStartDate = createAction('SET_CONDITION_START_DATE');
export const setConditionEndDate = createAction('SET_CONDITION_END_DATE');
export const setConditionStatus = createAction('SET_CONDITION_STATUS');