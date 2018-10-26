import {handleActions} from 'redux-actions';
import {UserManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 画面 TAB
    tabId: 'base',

    // 用户详情：授权时间
    createdOn: '',
    // 用户详情：微信昵称
    weChatName: '',

    // 用户详情：关注状态
    weChatStatus: 0,
    // 用户详情：认证状态
    authStatus: 0,

    // 消息记录：列表
    messageArray: [],
    // 消息记录：开始位置
    msgStart: 0,
    // 消息记录：每页数量
    msgSize: 7,
    // 消息记录：检索结果数量
    msgDataSize: 0
};

export default handleActions({
    [UserManagerDetailActionType.setTabId]: (state, action) => {
        return {
            ...state,
            tabId: action.payload
        }
    },
    [UserManagerDetailActionType.setCreatedOn]: (state, action) => {
        return {
            ...state,
            createdOn: action.payload
        }
    },
    [UserManagerDetailActionType.setWeChatName]: (state, action) => {
        return {
            ...state,
            weChatName: action.payload
        }
    },



    [UserManagerDetailActionType.setWeChatStatus]: (state, action) => {
        return {
            ...state,
            weChatStatus: action.payload
        }
    },
    [UserManagerDetailActionType.setAuthStatus]: (state, action) => {
        return {
            ...state,
            authStatus: action.payload
        }
    },





    [UserManagerDetailActionType.getMessageList]: (state, action) => {
        return {
            ...state,
            messageArray: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgStartNumber]: (state, action) => {
        return {
            ...state,
            msgStart: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgDataSize]: (state, action) => {
        return {
            ...state,
            msgDataSize: action.payload
        }
    }
}, initialState)