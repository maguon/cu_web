import {createAction} from 'redux-actions';

export const getPoliceList = createAction('GET_POLICE_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionName = createAction('SET_CONDITION_NAME');
export const setConditionGender = createAction('SET_CONDITION_GENDER');
export const setConditionPosition = createAction('SET_CONDITION_POSITION');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionStatus = createAction('SET_CONDITION_STATUS');
export const setName = createAction('SET_NAME');
export const setGender = createAction('SET_GENDER');
export const setPolicePosition = createAction('SET_POLICE_POSITION');
export const setPhone = createAction('SET_PHONE');
export const setPassword = createAction('SET_PASSWORD');
