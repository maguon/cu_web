import {handleActions} from 'redux-actions';
import {LogCompanyActionType} from '../../actionTypes';

const initialState = {
    // 检索条件：编号
    conditionNo: '',
    // 检索条件：名称
    conditionName: '',
    // 检索条件：联系电话
    conditionPhone: '',
    // 快递公司 检索结果列表
    logCompanyArray: []
};

export default handleActions({
    [LogCompanyActionType.getLogCompanyList]: (state, action) => {
        return {
            ...state,
            logCompanyArray: action.payload
        }
    },
    [LogCompanyActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [LogCompanyActionType.setConditionName]: (state, action) => {
        return {
            ...state,
            conditionName: action.payload
        }
    },
    [LogCompanyActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    }
}, initialState)

