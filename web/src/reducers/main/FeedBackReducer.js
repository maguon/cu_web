import {handleActions} from 'redux-actions';
import {FeedBackActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：售后编号
    conditionNo: '',
    // 检索条件：关联订单
    conditionOrderId: '',
    // 检索条件：申请人
    conditionUser: '',
    // 检索条件：手机
    conditionPhone: '',
    // 检索条件：申请时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：申请时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：处理时间(始)
    conditionUpdatedOnStart: '',
    // 检索条件：处理时间(终)
    conditionUpdatedOnEnd: '',
    // 检索条件：处理状态
    conditionStatus: null,

    // 售后管理结果列表
    feedBackArray: []
};

export default handleActions({
    [FeedBackActionType.getFeedBackList]: (state, action) => {
        return {
            ...state,
            feedBackArray: action.payload
        }
    },
    [FeedBackActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [FeedBackActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [FeedBackActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [FeedBackActionType.setConditionOrderId]: (state, action) => {
        return {
            ...state,
            conditionOrderId: action.payload
        }
    },
    [FeedBackActionType.setConditionUser]: (state, action) => {
        return {
            ...state,
            conditionUser: action.payload
        }
    },
    [FeedBackActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [FeedBackActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [FeedBackActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [FeedBackActionType.setConditionUpdatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionUpdatedOnStart: action.payload
        }
    },
    [FeedBackActionType.setConditionUpdatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionUpdatedOnEnd: action.payload
        }
    },
    [FeedBackActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)