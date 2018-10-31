import {handleActions} from 'redux-actions';
import {CarQRCodeModalActionType} from '../../actionTypes';

const initialState = {
    // 用户
    userId: '',
    // 编号
    carNo: '',
    // 车牌号
    plateNum: ''
};

export default handleActions({
    [CarQRCodeModalActionType.setUserId]: (state, action) => {
        return {
            ...state,
            userId: action.payload
        }
    },
    [CarQRCodeModalActionType.setCarNo]: (state, action) => {
        return {
            ...state,
            carNo: action.payload
        }
    },
    [CarQRCodeModalActionType.setPlateNum]: (state, action) => {
        return {
            ...state,
            plateNum: action.payload
        }
    }
}, initialState)

