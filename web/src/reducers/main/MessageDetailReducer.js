import {handleActions} from 'redux-actions';
import {MessageDetailActionType} from '../../actionTypes';

const initialState = {
    // 消息详情：消息编号
    messageId: '',
    // 消息详情：消息类型
    messageType: 1,
    // 消息详情：消息时间
    messageCreateOn: '',
    // 消息详情：消息内容
    messageContent: '',
    // 消息详情：绑定用户
    bindUser: '',
    // 消息详情：联系电话
    phone: ''
};

export default handleActions({
    [MessageDetailActionType.setMsgId]: (state, action) => {
        return {
            ...state,
            messageId: action.payload
        }
    },
    [MessageDetailActionType.setMsgType]: (state, action) => {
        return {
            ...state,
            messageType: action.payload
        }
    },
    [MessageDetailActionType.setMsgCreatedOn]: (state, action) => {
        return {
            ...state,
            messageCreateOn: action.payload
        }
    },
    [MessageDetailActionType.setMsgContent]: (state, action) => {
        return {
            ...state,
            messageContent: action.payload
        }
    },
    [MessageDetailActionType.setBindUser]: (state, action) => {
        return {
            ...state,
            bindUser: action.payload
        }
    },
    [MessageDetailActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    }
}, initialState)