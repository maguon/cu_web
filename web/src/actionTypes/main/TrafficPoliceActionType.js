import { createAction } from 'redux-actions';

export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionName = createAction('SET_CONDITION_NAME');
export const setConditionGender = createAction('SET_CONDITION_GENDER');
export const setConditionPosition = createAction('SET_CONDITION_POSITION');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionStatus = createAction('SET_CONDITION_STATUS');


export const getCityInfo = createAction('GET_CITY_INFO');
export const addCityInfo = createAction('ADD_CITY_INFO');
export const setCityFormFlag = createAction('SET_CITY_FORM_FLAG');
