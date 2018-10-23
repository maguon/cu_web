import {handleActions} from 'redux-actions';
import {MessageActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：消息编号
    conditionNo: '',
    // 检索条件：被通知车辆
    conditionPlateNum: '',
    // 检索条件：接收电话
    conditionPhone: '',
    // 检索条件：接收用户
    conditionBindUser: '',

    // 检索条件：扫描交警
    conditionTrafficPolice: {value: '', label: ''},
    // 检索条件：发送时间(始)
    conditionStartDate: '',
    // 检索条件：发送时间(终)
    conditionEndDate: '',
    // 检索条件：是否成功
    conditionStatus: {value: '', label: ''},

    // 消息记录 检索条件交警列表
    trafficPoliceArray: [],
    // 消息记录 检索结果列表
    messageArray: []
};

export default handleActions({
    [MessageActionType.getPoliceList]: (state, action) => {
        let policeList = [];
        action.payload.forEach((value) => {
            policeList.push({value: value.id, label: value.user_name})
        });
        return {
            ...state,
            trafficPoliceArray: policeList
        }
    },
    [MessageActionType.getMessageList]: (state, action) => {
        return {
            ...state,
            messageArray: action.payload
        }
    },
    [MessageActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [MessageActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [MessageActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [MessageActionType.setConditionPlateNum]: (state, action) => {
        return {
            ...state,
            conditionPlateNum: action.payload
        }
    },
    [MessageActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [MessageActionType.setConditionBindUser]: (state, action) => {
        return {
            ...state,
            conditionBindUser: action.payload
        }
    },
    [MessageActionType.setConditionTrafficPolice]: (state, action) => {
        return {
            ...state,
            conditionTrafficPolice: action.payload
        }
    },
    [MessageActionType.setConditionStartDate]: (state, action) => {
        return {
            ...state,
            conditionStartDate: action.payload
        }
    },
    [MessageActionType.setConditionEndDate]: (state, action) => {
        return {
            ...state,
            conditionEndDate: action.payload
        }
    },
    [MessageActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)

