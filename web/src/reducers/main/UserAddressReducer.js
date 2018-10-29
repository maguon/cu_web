import {handleActions} from 'redux-actions';
import {UserAddressActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：地址编号
    conditionNo: '',
    // 检索条件：收货人
    conditionShipName: '',
    // 检索条件：收货电话
    conditionShipPhone: '',
    // 检索条件：用户
    conditionBindUser: '',
    // 检索条件：绑定手机
    conditionBindPhone: '',

    // 收货地址 检索结果列表
    addressArray: []
};

export default handleActions({
    [UserAddressActionType.getUserAddressList]: (state, action) => {
        return {
            ...state,
            addressArray: action.payload
        }
    },
    [UserAddressActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [UserAddressActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },

    [UserAddressActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [UserAddressActionType.setConditionShipName]: (state, action) => {
        return {
            ...state,
            conditionShipName: action.payload
        }
    },
    [UserAddressActionType.setConditionShipPhone]: (state, action) => {
        return {
            ...state,
            conditionShipPhone: action.payload
        }
    },
    [UserAddressActionType.setConditionBindUser]: (state, action) => {
        return {
            ...state,
            conditionBindUser: action.payload
        }
    },
    [UserAddressActionType.setConditionBindPhone]: (state, action) => {
        return {
            ...state,
            conditionBindPhone: action.payload
        }
    }
}, initialState)

