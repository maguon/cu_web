import {handleActions} from 'redux-actions';
import {CheckCarActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：编号
    conditionNo: '',
    // 检索条件：车牌号
    conditionPlateNum: '',
    // 检索条件：车主电话
    conditionPhone: '',
    // 检索条件：交警
    conditionPoliceNm: '',
    // 检索条件：扫描时间(始)
    conditionStartDate: '',
    // 检索条件：扫描时间(终)
    conditionEndDate: '',

    // 消息记录 检索结果列表
    checkCarArray: []
};

export default handleActions({
    [CheckCarActionType.getCheckCarList]: (state, action) => {
        return {
            ...state,
            checkCarArray: action.payload
        }
    },
    [CheckCarActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [CheckCarActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [CheckCarActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [CheckCarActionType.setConditionPlateNum]: (state, action) => {
        return {
            ...state,
            conditionPlateNum: action.payload
        }
    },
    [CheckCarActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [CheckCarActionType.setConditionPoliceNm]: (state, action) => {
        return {
            ...state,
            conditionPoliceNm: action.payload
        }
    },
    [CheckCarActionType.setConditionStartDate]: (state, action) => {
        return {
            ...state,
            conditionStartDate: action.payload
        }
    },
    [CheckCarActionType.setConditionEndDate]: (state, action) => {
        return {
            ...state,
            conditionEndDate: action.payload
        }
    }
}, initialState)

