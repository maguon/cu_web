import {createAction} from 'redux-actions';

export const setTabId = createAction('SET_TAB_ID');
export const setCreatedOn = createAction('SET_CREATED_ON');
export const setWeChatName = createAction('SET_WE_CHAT_NAME');
export const setWeChatStatus = createAction('SET_WE_CHAT_STATUS');
export const setAuthStatus = createAction('SET_AUTH_STATUS');
export const setPhone = createAction('SET_PHONE');
export const setUserName = createAction('SET_USER_NAME');
export const setGender = createAction('SET_GENDER');
export const setBirth = createAction('SET_BIRTH');
export const setAuthTime = createAction('SET_AUTH_TIME');

export const getUserCarList = createAction('GET_USER_CAR_LIST');
export const setMsgConditionType = createAction('SET_MSG_CONDITION_TYPE');
export const setMsgConditionStartDate = createAction('SET_MSG_CONDITION_START_DATE');
export const setMsgConditionEndDate = createAction('SET_MSG_CONDITION_END_DATE');
export const getMessageList = createAction('GET_CHECK_CAR_LIST');
export const setMsgStartNumber = createAction('SET_MSG_START_NUMBER');
export const setMsgDataSize = createAction('SET_MSG_DATA_SIZE');

export const getTransactionList = createAction('GET_TRANSACTION_LIST');
export const getAddressList = createAction('GET_ADDRESS_LIST');