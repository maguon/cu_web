import {createAction} from 'redux-actions';

export const getPoliceList = createAction('GET_POLICE_LIST');
export const getMessageList = createAction('GET_MESSAGE_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');

export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionPlateNum = createAction('SET_CONDITION_PLATE_NUM');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionBindUser = createAction('SET_CONDITION_BIND_USER');
export const setConditionTrafficPolice = createAction('SET_CONDITION_TRAFFIC_POLICE');
export const setConditionStartDate = createAction('SET_CONDITION_START_DATE');
export const setConditionEndDate = createAction('SET_CONDITION_END_DATE');
export const setConditionStatus = createAction('SET_CONDITION_STATUS');