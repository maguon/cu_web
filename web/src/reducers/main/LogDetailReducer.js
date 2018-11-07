import {handleActions} from 'redux-actions';
import {MessageDetailActionType} from '../../actionTypes';

const initialState = {
    // 消息详情
    messageInfo: []
};

export default handleActions({
    [MessageDetailActionType.getMessageInfo]: (state, action) => {
        return {
            ...state,
            messageInfo: action.payload
        }
    }
}, initialState)