import {handleActions} from 'redux-actions';
import {SaleActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,
    // 检索条件：销售编号
    conditionNo: '',
    // 检索条件：商品编号
    conditionProductId: '',
    // 检索条件：商品名称
    conditionProductName: '',
    // 检索条件：关联订单
    conditionOrderId: '',
    // 检索条件：售出时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：售出时间(终)
    conditionCreatedOnEnd: '',
    // 商品销售 检索结果列表
    saleArray: []
};

export default handleActions({
    [SaleActionType.getSaleList]: (state, action) => {
        return {
            ...state,
            saleArray: action.payload
        }
    },
    [SaleActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [SaleActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [SaleActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [SaleActionType.setConditionProductId]: (state, action) => {
        return {
            ...state,
            conditionProductId: action.payload
        }
    },
    [SaleActionType.setConditionProductName]: (state, action) => {
        return {
            ...state,
            conditionProductName: action.payload
        }
    },
    [SaleActionType.setConditionOrderId]: (state, action) => {
        return {
            ...state,
            conditionOrderId: action.payload
        }
    },
    [SaleActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [SaleActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    }
}, initialState)