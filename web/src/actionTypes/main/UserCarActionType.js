import {createAction} from 'redux-actions';

export const getUserCarList = createAction('GET_USER_CAR_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionPlateNum = createAction('SET_CONDITION_PLATE_NUM');
export const setConditionVin = createAction('SET_CONDITION_VIN');
export const setConditionBindStatus = createAction('SET_CONDITION_BIND_STATUS');
export const setConditionBindUser = createAction('SET_CONDITION_BIND_USER');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionBindTimeStart = createAction('SET_CONDITION_BIND_TIME_START');
export const setConditionBindTimeEnd = createAction('SET_CONDITION_BIND_TIME_END');