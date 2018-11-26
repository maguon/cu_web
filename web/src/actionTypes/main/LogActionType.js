import {createAction} from 'redux-actions';

export const getLogList = createAction('GET_LOG_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionOrder = createAction('SET_CONDITION_ORDER');
export const setConditionLogCo = createAction('SET_CONDITION_LOG_CO');
export const setConditionLogStatus = createAction('SET_CONDITION_LOG_STATUS');
export const setConditionLogNum = createAction('SET_CONDITION_LOG_NUM');
export const setConditionRecvName = createAction('SET_CONDITION_RECV_NAME');
export const setConditionRecvPhone = createAction('SET_CONDITION_RECV_PHONE');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');
export const setConditionUpdatedOnStart = createAction('SET_CONDITION_UPDATED_ON_START');
export const setConditionUpdatedOnEnd = createAction('SET_CONDITION_UPDATED_ON_END');