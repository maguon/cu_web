import {handleActions} from 'redux-actions';
import {FeedBackDetailActionType} from '../../actionTypes';

const initialState = {
    // 售后管理 - 订单详情
    orderInfo: [],

    // 售后管理 - 订单内，商品列表
    productArray: [],

    // 售后管理 - 售后详情
    feedBackInfo: [],

    // 售后管理 - 售后详情：处理描述
    processRemark: '',
    // 售后管理 - 售后详情：处理方法
    processMethod: '',
};

export default handleActions({
    [FeedBackDetailActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [FeedBackDetailActionType.getProductList]: (state, action) => {
        return {
            ...state,
            productArray: action.payload
        }
    },
    [FeedBackDetailActionType.getFeedBackInfo]: (state, action) => {
        return {
            ...state,
            feedBackInfo: action.payload
        }
    },
    [FeedBackDetailActionType.setProcessRemark]: (state, action) => {
        return {
            ...state,
            processRemark: action.payload
        }
    },
    [FeedBackDetailActionType.setProcessMethod]: (state, action) => {
        return {
            ...state,
            processMethod: action.payload
        }
    }
}, initialState)