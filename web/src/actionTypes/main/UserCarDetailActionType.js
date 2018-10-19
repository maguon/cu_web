import {createAction} from 'redux-actions';

export const setTabId = createAction('SET_TAB_ID');
export const setCreatedOn = createAction('SET_CREATED_ON');
export const setStatus = createAction('SET_STATUS');
export const setPlateNum = createAction('SET_PLATE_NUM');
export const setPhone = createAction('SET_PHONE');
export const setBindUser = createAction('SET_BIND_USER');
export const setVin = createAction('SET_VIN');
export const setEngineNum = createAction('SET_ENGINE_NUM');

export const getMessageList = createAction('GET_MESSAGE_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');

export const setMsgId = createAction('SET_MESSAGE_ID');
export const setMsgName = createAction('SET_MESSAGE_NAME');
export const setMsgCreatedOn = createAction('SET_MESSAGE_CREATED_ON');
export const setMsgContent = createAction('SET_MESSAGE_CONTENT');
export const setMsgAddress = createAction('SET_MESSAGE_ADDRESS');
export const setMsgSuperviseName = createAction('SET_MESSAGE_SUPERVISE_NAME');
