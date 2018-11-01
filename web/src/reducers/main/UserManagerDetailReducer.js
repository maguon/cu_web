import {handleActions} from 'redux-actions';
import {UserManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 画面 TAB 标记
    tabId: 'base',

    // 基本信息TAB：授权时间
    createdOn: '',
    // 基本信息TAB：微信昵称
    weChatName: '',
    // 基本信息TAB：关注状态
    weChatStatus: 0,
    // 基本信息TAB：认证状态
    authStatus: 0,
    // 基本信息TAB：手机
    phone: '',
    // 基本信息TAB：姓名
    userName: '',
    // 基本信息TAB：性别
    gender: 0,
    // 基本信息TAB：出生年月日
    birth: '',
    // 基本信息TAB：认证时间
    authTime: '',

    // 绑定车辆TAB：列表
    userCarArray: [],

    // 消息记录TAB： 检索条件：消息类型
    msgConditionType: null,
    // 消息记录TAB： 检索条件：发送时间(始)
    msgConditionStartDate: '',
    // 消息记录TAB： 检索条件：发送时间(终)
    msgConditionEndDate: '',
    // 消息记录TAB：开始位置
    msgStart: 0,
    // 消息记录TAB：每页数量
    msgSize: 9,
    // 消息记录TAB：检索结果数量
    msgDataSize: 0,
    // 消息记录TAB：列表
    messageArray: [],

    // 交易记录TAB：列表
    transactionArray: [],

    // 收货地址TAB：列表
    addressArray: []
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
    [UserManagerDetailActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [UserManagerDetailActionType.setUserName]: (state, action) => {
        return {
            ...state,
            userName: action.payload
        }
    },
    [UserManagerDetailActionType.setGender]: (state, action) => {
        return {
            ...state,
            gender: action.payload
        }
    },
    [UserManagerDetailActionType.setBirth]: (state, action) => {
        return {
            ...state,
            birth: action.payload
        }
    },
    [UserManagerDetailActionType.setAuthTime]: (state, action) => {
        return {
            ...state,
            authTime: action.payload
        }
    },

    [UserManagerDetailActionType.getUserCarList]: (state, action) => {
        return {
            ...state,
            userCarArray: action.payload
        }
    },

    [UserManagerDetailActionType.setMsgConditionType]: (state, action) => {
        return {
            ...state,
            msgConditionType: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgConditionStartDate]: (state, action) => {
        return {
            ...state,
            msgConditionStartDate: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgConditionEndDate]: (state, action) => {
        return {
            ...state,
            msgConditionEndDate: action.payload
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
    },
    [UserManagerDetailActionType.getMessageList]: (state, action) => {
        return {
            ...state,
            messageArray: action.payload
        }
    },

    [UserManagerDetailActionType.getTransactionList]: (state, action) => {
        return {
            ...state,
            transactionArray: action.payload
        }
    },

    [UserManagerDetailActionType.getAddressList]: (state, action) => {
        return {
            ...state,
            addressArray: action.payload
        }
    }
}, initialState)