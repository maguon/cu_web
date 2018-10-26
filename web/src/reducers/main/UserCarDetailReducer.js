import {handleActions} from 'redux-actions';
import {UserCarDetailActionType} from '../../actionTypes';

const initialState = {
    // 画面 TAB
    tabId: 'base',

    // 车辆信息：绑定时间
    createdOn: '',
    // 车辆信息：绑定状态
    status: 0,
    // 车辆信息：车牌号码
    plateNum: '',
    // 车辆信息：联系电话
    phone: '',
    // 车辆信息：绑定用户
    bindUser: '',
    // 车辆信息：车辆识别码
    vin: '',
    // 车辆信息：发动机号码
    engineNum: '',

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
    [UserCarDetailActionType.setTabId]: (state, action) => {
        return {
            ...state,
            tabId: action.payload
        }
    },
    [UserCarDetailActionType.setCreatedOn]: (state, action) => {
        return {
            ...state,
            createdOn: action.payload
        }
    },
    [UserCarDetailActionType.setStatus]: (state, action) => {
        return {
            ...state,
            status: action.payload
        }
    },
    [UserCarDetailActionType.setPlateNum]: (state, action) => {
        return {
            ...state,
            plateNum: action.payload
        }
    },
    [UserCarDetailActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [UserCarDetailActionType.setBindUser]: (state, action) => {
        return {
            ...state,
            bindUser: action.payload
        }
    },
    [UserCarDetailActionType.setVin]: (state, action) => {
        return {
            ...state,
            vin: action.payload
        }
    },
    [UserCarDetailActionType.setEngineNum]: (state, action) => {
        return {
            ...state,
            engineNum: action.payload
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