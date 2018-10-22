import {handleActions} from 'redux-actions';
import {UserCarDetailActionType} from '../../actionTypes';

const sysConst = require('../../util/SysConst');

const initialState = {
    // 绑定状态列表
    bindList: sysConst.BIND_STATUS,
    // 画面 TAB
    tabId: 'base',
    // 车辆信息：绑定时间
    createdOn: '',
    // 车辆信息：绑定状态
    status: 0,
    // 车辆信息：车牌号码
    plateNum: '',
    // 车辆信息：联系电话
    phone: '',
    // 车辆信息：绑定用户
    bindUser: '',
    // 车辆信息：车辆识别码
    vin: '',
    // 车辆信息：发动机号码
    engineNum: '',

    // 扫描记录列表
    messageArray: [],
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,
    // 消息状态
    messageStatus: sysConst.MESSAGE_STATUS,

    // 消息详情：消息编号
    messageId: '',
    // 消息详情：消息名称
    messageName: '',
    // 消息详情：消息时间
    messageCreateOn: '',
    // 消息详情：消息内容
    messageContent: '',
    // 消息详情：消息地址
    messageAddress: '',
    // 消息详情：扫描交警
    messageSuperviseName: ''
};

export default handleActions({
    [UserCarDetailActionType.setTabId]: (state, action) => {
        return {
            ...state,
            tabId: action.payload
        }
    },
    [UserCarDetailActionType.setCreatedOn]: (state, action) => {
        return {
            ...state,
            createdOn: action.payload
        }
    },
    [UserCarDetailActionType.setStatus]: (state, action) => {
        return {
            ...state,
            status: action.payload
        }
    },
    [UserCarDetailActionType.setPlateNum]: (state, action) => {
        return {
            ...state,
            plateNum: action.payload
        }
    },
    [UserCarDetailActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [UserCarDetailActionType.setBindUser]: (state, action) => {
        return {
            ...state,
            bindUser: action.payload
        }
    },
    [UserCarDetailActionType.setVin]: (state, action) => {
        return {
            ...state,
            vin: action.payload
        }
    },
    [UserCarDetailActionType.setEngineNum]: (state, action) => {
        return {
            ...state,
            engineNum: action.payload
        }
    },
    [UserCarDetailActionType.getMessageList]: (state, action) => {
        return {
            ...state,
            messageArray: action.payload
        }
    },
    [UserCarDetailActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [UserCarDetailActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [UserCarDetailActionType.setMsgId]: (state, action) => {
        return {
            ...state,
            messageId: action.payload
        }
    },
    [UserCarDetailActionType.setMsgName]: (state, action) => {
        return {
            ...state,
            messageName: action.payload
        }
    },
    [UserCarDetailActionType.setMsgCreatedOn]: (state, action) => {
        return {
            ...state,
            messageCreateOn: action.payload
        }
    },
    [UserCarDetailActionType.setMsgContent]: (state, action) => {
        return {
            ...state,
            messageContent: action.payload
        }
    },
    [UserCarDetailActionType.setMsgAddress]: (state, action) => {
        return {
            ...state,
            messageAddress: action.payload
        }
    },
    [UserCarDetailActionType.setMsgSuperviseName]: (state, action) => {
        return {
            ...state,
            messageSuperviseName: action.payload
        }
    }
}, initialState)