import {handleActions} from 'redux-actions';
import {LogDetailActionType} from '../../actionTypes';

const initialState = {
    // 发货详情
    logInfo: []
};

export default handleActions({
    [LogDetailActionType.getLogInfo]: (state, action) => {
        return {
            ...state,
            logInfo: action.payload
        }
    }
}, initialState)