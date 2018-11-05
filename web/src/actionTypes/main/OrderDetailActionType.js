import {createAction} from 'redux-actions';

export const getUserCarInfo = createAction('GET_USER_CAR_INFO');

export const getCheckCarList = createAction('GET_CHECK_CAR_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');