import {handleActions} from 'redux-actions';
import {LogActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：发货编号
    conditionNo: '',
    // 检索条件：关联订单
    conditionOrder: '',
    // 检索条件：快递公司
    conditionLogCo: null,
    // 检索条件：物流编号
    conditionLogNum: '',
    // 检索条件：收货人
    conditionRecvName: '',
    // 检索条件：收货电话
    conditionRecvPhone: '',
    // 检索条件：创建时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：创建时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：发货时间(始)
    conditionUpdatedOnStart: '',
    // 检索条件：发货时间(终)
    conditionUpdatedOnEnd: '',

    // 发货记录 检索结果列表
    logArray: [],
    // 快递公司 列表
    logCoArray: []
};

export default handleActions({
    [LogActionType.getLogCoList]: (state, action) => {
        let logCoList = [];
        action.payload.forEach((value) => {
            logCoList.push({value: value.id, label: value.company_name})
        });
        return {
            ...state,
            logCoArray: logCoList
        }
    },
    [LogActionType.getLogList]: (state, action) => {
        return {
            ...state,
            logArray: action.payload
        }
    },
    [LogActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [LogActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [LogActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [LogActionType.setConditionOrder]: (state, action) => {
        return {
            ...state,
            conditionOrder: action.payload
        }
    },
    [LogActionType.setConditionLogCo]: (state, action) => {
        return {
            ...state,
            conditionLogCo: action.payload
        }
    },
    [LogActionType.setConditionLogNum]: (state, action) => {
        return {
            ...state,
            conditionLogNum: action.payload
        }
    },
    [LogActionType.setConditionRecvName]: (state, action) => {
        return {
            ...state,
            conditionRecvName: action.payload
        }
    },
    [LogActionType.setConditionRecvPhone]: (state, action) => {
        return {
            ...state,
            conditionRecvPhone: action.payload
        }
    },
    [LogActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [LogActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [LogActionType.setConditionUpdatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionUpdatedOnStart: action.payload
        }
    },
    [LogActionType.setConditionUpdatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionUpdatedOnEnd: action.payload
        }
    }
}, initialState)

