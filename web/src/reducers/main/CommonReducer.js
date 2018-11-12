import {handleActions} from 'redux-actions';
import {CommonActionType} from '../../actionTypes';

const initialState = {
    // 快递公司 列表
    logCoArray: []
};

export default handleActions({
    [CommonActionType.getLogCoList]: (state, action) => {
        let logCoList = [];
        action.payload.forEach((value) => {
            logCoList.push({value: value.id, label: value.company_name})
        });
        return {
            ...state,
            logCoArray: logCoList
        }
    }
}, initialState)

