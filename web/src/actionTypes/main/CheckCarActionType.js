import {createAction} from 'redux-actions';

export const getCheckCarList = createAction('GET_CHECK_CAR_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionPlateNum = createAction('SET_CONDITION_PLATE_NUM');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionPoliceNm = createAction('SET_CONDITION_POLICE_NAME');
export const setConditionStartDate = createAction('SET_CONDITION_START_DATE');
export const setConditionEndDate = createAction('SET_CONDITION_END_DATE');