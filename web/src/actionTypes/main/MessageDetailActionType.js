import {createAction} from 'redux-actions';

export const setMsgId = createAction('SET_MESSAGE_ID');
export const setMsgName = createAction('SET_MESSAGE_NAME');
export const setMsgContent = createAction('SET_MESSAGE_CONTENT');
export const setMsgCreatedOn = createAction('SET_MESSAGE_CREATED_ON');

export const setPlateNum = createAction('SET_PLATE_NUM');
export const setBindUser = createAction('SET_BIND_USER');
export const setPhone = createAction('SET_PHONE');
export const setAddress = createAction('SET_ADDRESS');
export const setSuperviseName = createAction('SET_SUPERVISE_NAME');
