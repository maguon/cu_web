import {handleActions} from 'redux-actions';
import {TrafficPoliceActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

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

    // 交警检索结果列表
    policeArray: [],

    // 增加交警：姓名
    name: '',
    // 增加交警：性别
    gender: '0',
    // 增加交警：职务
    position: {value: '', label: ''},
    // 增加交警：电话
    phone: '',
    // 增加交警：密码
    password: ''
};

export default handleActions({
    [TrafficPoliceActionType.getPoliceList]: (state, action) => {
        return {
            ...state,
            policeArray: action.payload
        }
    },
    [TrafficPoliceActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [TrafficPoliceActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
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
    },
    [TrafficPoliceActionType.setName]: (state, action) => {
        return {
            ...state,
            name: action.payload
        }
    },
    [TrafficPoliceActionType.setGender]: (state, action) => {
        return {
            ...state,
            gender: action.payload
        }
    },
    [TrafficPoliceActionType.setPolicePosition]: (state, action) => {
        return {
            ...state,
            position: action.payload
        }
    },
    [TrafficPoliceActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [TrafficPoliceActionType.setPassword]: (state, action) => {
        return {
            ...state,
            password: action.payload
        }
    }
}, initialState)

