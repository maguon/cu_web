import {handleActions} from 'redux-actions';
import {LogActionType, SendOutModalActionType} from '../../actionTypes';

const initialState = {
    // 发货详细信息
    logInfo: [],
    // 快递公司 列表
    logCoArray: [],

    // 申请原因
    applyReason: '',
    // 已退款金额
    refundMoney: 0,
    // 运费
    freight: ''
};

export default handleActions({
    [SendOutModalActionType.setLogInfo]: (state, action) => {
        return {
            ...state,
            logInfo: action.payload
        }
    },
    [SendOutModalActionType.getLogCoList]: (state, action) => {
        let logCoList = [];
        action.payload.forEach((value) => {
            logCoList.push({value: value.id, label: value.company_name})
        });
        return {
            ...state,
            logCoArray: logCoList
        }
    },



    [SendOutModalActionType.setApplyReason]: (state, action) => {
        return {
            ...state,
            applyReason: action.payload
        }
    },
    [SendOutModalActionType.setRefundMoney]: (state, action) => {
        return {
            ...state,
            refundMoney: action.payload
        }
    },
    [SendOutModalActionType.setFreight]: (state, action) => {
        return {
            ...state,
            freight: action.payload
        }
    }
}, initialState)

