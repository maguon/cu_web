import {createAction, handleActions} from 'redux-actions';
import {TrafficPoliceActionType} from '../../actionTypes';

const sysConst = require('../../util/SysConst');

const initialState = {
    // 性别列表
    genderList: sysConst.GENDER,
    // 职务列表
    policePositionList: sysConst.POLICE_POSITION,
    // 状态列表
    policeStatusList: sysConst.POLICE_STATUS,

    // 检索条件：编号
    conditionNo: '',
    // 检索条件：姓名
    conditionName: '',
    // 检索条件：性别
    conditionGender: {value: '', label: ''},
    // 检索条件：职务
    conditionPosition: {value: '', label: ''},
    // 检索条件：电话
    conditionPhone: '',
    // 检索条件：状态
    conditionStatus: {value: '', label: ''},

    cityArray :[],
    cityFormFlag : false,
    cityName : ''
}

export default handleActions({
    [TrafficPoliceActionType.getCityInfo]: (state, action) => {

        return {
            ...state,
            cityArray: action.payload
        }
    },
    [TrafficPoliceActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [TrafficPoliceActionType.setConditionName]: (state, action) => {
        return {
            ...state,
            conditionName: action.payload
        }
    },
    [TrafficPoliceActionType.setConditionGender]: (state, action) => {
        return {
            ...state,
            conditionGender: action.payload
        }
    },


    [TrafficPoliceActionType.setConditionPosition]: (state, action) => {
        return {
            ...state,
            conditionPosition: action.payload
        }
    },
    [TrafficPoliceActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [TrafficPoliceActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
} , initialState)

