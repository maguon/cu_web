import {handleActions} from 'redux-actions';
import {MessageDetailActionType} from '../../actionTypes';

const initialState = {
    // 消息详情：消息编号
    messageId: '',
    // 消息详情：消息名称
    messageName: '',
    // 消息详情：消息时间
    messageCreateOn: '',
    // 消息详情：消息内容
    messageContent: '',
    // 消息详情：车牌号码
    plateNum: '',
    // 消息详情：绑定用户
    bindUser: '',
    // 消息详情：联系电话
    phone: '',
    // 消息详情：地址
    address: '',
    // 消息详情：扫描交警
    superviseName: ''
};

export default handleActions({
    [MessageDetailActionType.setMsgId]: (state, action) => {
        return {
            ...state,
            messageId: action.payload
        }
    },
    [MessageDetailActionType.setMsgName]: (state, action) => {
        return {
            ...state,
            messageName: action.payload
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
    [MessageDetailActionType.setPlateNum]: (state, action) => {
        return {
            ...state,
            plateNum: action.payload
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
    },
    [MessageDetailActionType.setAddress]: (state, action) => {
        return {
            ...state,
            address: action.payload
        }
    },
    [MessageDetailActionType.setSuperviseName]: (state, action) => {
        return {
            ...state,
            superviseName: action.payload
        }
    }
}, initialState)