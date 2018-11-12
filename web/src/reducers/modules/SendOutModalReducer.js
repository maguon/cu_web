import {handleActions} from 'redux-actions';
import {SendOutModalActionType} from '../../actionTypes';

const initialState = {
    // 发货详细信息
    logInfo: [],
    // 快递公司
    logCompany: null,
    // 快递单号
    logNum: '',
    // 运费
    freight: '',
    // 备注
    remark: ''
};

export default handleActions({
    [SendOutModalActionType.setLogInfo]: (state, action) => {
        return {
            ...state,
            logInfo: action.payload
        }
    },
    [SendOutModalActionType.setLogCompany]: (state, action) => {
        return {
            ...state,
            logCompany: action.payload
        }
    },
    [SendOutModalActionType.setLogNum]: (state, action) => {
        return {
            ...state,
            logNum: action.payload
        }
    },
    [SendOutModalActionType.setFreight]: (state, action) => {
        return {
            ...state,
            freight: action.payload
        }
    },
    [SendOutModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)

