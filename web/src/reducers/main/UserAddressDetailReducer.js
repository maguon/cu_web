import {handleActions} from 'redux-actions';
import {UserAddressDetailActionType} from '../../actionTypes';

const initialState = {
    // 收货地址 - 地址详情
    addressInfo: []
};

export default handleActions({
    [UserAddressDetailActionType.getAddressInfo]: (state, action) => {
        return {
            ...state,
            addressInfo: action.payload
        }
    }
}, initialState)