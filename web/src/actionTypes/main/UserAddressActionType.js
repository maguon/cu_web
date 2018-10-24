import {createAction} from 'redux-actions';

export const getUserAddressList = createAction('GET_USER_ADDRESS_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionShipName = createAction('SET_CONDITION_SHIP_NAME');
export const setConditionShipPhone = createAction('SET_CONDITION_SHIP_PHONE');
export const setConditionBindUser = createAction('SET_CONDITION_BIND_USER');
export const setConditionBindPhone = createAction('SET_CONDITION_BIND_PHONE');