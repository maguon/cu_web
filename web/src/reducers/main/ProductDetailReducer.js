import {handleActions} from 'redux-actions';
import {UserCarDetailActionType} from '../../actionTypes';

const initialState = {
    // 绑定车辆管理 - 车辆信息
    userCarInfo: [],

    // 扫描记录列表
    checkCarArray: [],
    // 开始位置
    start: 0,
    // 每页数量
    size: 7,
    // 检索结果数量
    dataSize: 0
};

export default handleActions({
    [UserCarDetailActionType.getUserCarInfo]: (state, action) => {
        return {
            ...state,
            userCarInfo: action.payload
        }
    },
    [UserCarDetailActionType.getCheckCarList]: (state, action) => {
        return {
            ...state,
            checkCarArray: action.payload
        }
    },
    [UserCarDetailActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [UserCarDetailActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    }
}, initialState)