import {handleActions} from 'redux-actions';
import {UserAddressDetailActionType} from '../../actionTypes';

const initialState = {
    // 地址详情：最后修改时间
    lastModifyTime: '',
    // 地址详情：微信昵称
    weChatName: '',
    // 地址详情：绑定手机
    bindPhone: '',
    // 地址详情：收货地址
    address: '',
    // 地址详情：收货人
    shipName: '',
    // 地址详情：收货电话
    shipPhone: '',
};

export default handleActions({
    [UserAddressDetailActionType.setLastModifyTime]: (state, action) => {
        return {
            ...state,
            lastModifyTime: action.payload
        }
    },
    [UserAddressDetailActionType.setWeChatName]: (state, action) => {
        return {
            ...state,
            weChatName: action.payload
        }
    },
    [UserAddressDetailActionType.setBindPhone]: (state, action) => {
        return {
            ...state,
            bindPhone: action.payload
        }
    },
    [UserAddressDetailActionType.setShipName]: (state, action) => {
        return {
            ...state,
            shipName: action.payload
        }
    },
    [UserAddressDetailActionType.setShipPhone]: (state, action) => {
        return {
            ...state,
            shipPhone: action.payload
        }
    },
    [UserAddressDetailActionType.setAddress]: (state, action) => {
        return {
            ...state,
            address: action.payload
        }
    }
}, initialState)