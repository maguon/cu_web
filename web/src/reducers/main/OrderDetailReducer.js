import {handleActions} from 'redux-actions';
import {OrderDetailActionType} from '../../actionTypes';

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
    [OrderDetailActionType.getUserCarInfo]: (state, action) => {
        return {
            ...state,
            userCarInfo: action.payload
        }
    },
    [OrderDetailActionType.getCheckCarList]: (state, action) => {
        return {
            ...state,
            checkCarArray: action.payload
        }
    },
    [OrderDetailActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [OrderDetailActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    }
}, initialState)