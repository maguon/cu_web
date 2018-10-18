import {handleActions} from 'redux-actions';
import {UserCarActionType} from '../../actionTypes';

const sysConst = require('../../util/SysConst');

const initialState = {
    // 检索条件：开始位置
    start: 0,
    // 检索条件：每页数量
    size: 11,

    // 绑定状态列表
    bindList: sysConst.BIND_STATUS,

    // 检索条件：车辆编号
    conditionNo: '',
    // 检索条件：车辆号码
    conditionPlateNum: '',
    // 检索条件：车辆识别码
    conditionVin: '',
    // 检索条件：绑定状态
    conditionBindStatus: {value: '', label: '请选择'},
    conditionBindStatusList: [{value: '', label: '请选择'}, ...sysConst.BIND_STATUS],

    // 检索条件：绑定用户
    conditionBindUser: '',
    // 检索条件：电话
    conditionPhone: '',
    // 检索条件：绑定时间(始)
    conditionBindTimeStart: '',
    // 检索条件：绑定时间(终)
    conditionBindTimeEnd: '',

    // 绑定车辆检索结果列表
    userCarArray: []
};

export default handleActions({
    [UserCarActionType.getUserCarList]: (state, action) => {
        return {
            ...state,
            userCarArray: action.payload
        }
    },
    [UserCarActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [UserCarActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [UserCarActionType.setConditionPlateNum]: (state, action) => {
        return {
            ...state,
            conditionPlateNum: action.payload
        }
    },
    [UserCarActionType.setConditionVin]: (state, action) => {
        return {
            ...state,
            conditionVin: action.payload
        }
    },
    [UserCarActionType.setConditionBindStatus]: (state, action) => {
        return {
            ...state,
            conditionBindStatus: action.payload
        }
    },
    [UserCarActionType.setConditionBindUser]: (state, action) => {
        return {
            ...state,
            conditionBindUser: action.payload
        }
    },
    [UserCarActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [UserCarActionType.setConditionBindTimeStart]: (state, action) => {
        return {
            ...state,
            conditionBindTimeStart: action.payload
        }
    },
    [UserCarActionType.setConditionBindTimeEnd]: (state, action) => {
        return {
            ...state,
            conditionBindTimeEnd: action.payload
        }
    }
}, initialState)

